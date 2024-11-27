from django.shortcuts import render
from .services import transcribe_audio_with_openai, ai_generate_detailed_summary
from rest_framework.response import Response
from rest_framework.views import APIView, status
from .models import EmergencySession, Transcription, Summary
import os, logging
from django.conf import settings
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware, is_naive

logger = logging.getLogger(__name__)

class TranscriptionEndpoint(APIView):
    def post(self, request):
        session_id = request.data.get("session_id")
        if not session_id:
            return Response({"error": "Session ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        audio_file = request.FILES.get("audio")
        if not audio_file:
            return Response({"error": "No audio file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Save the audio file to a specific directory under MEDIA_ROOT
        save_path = os.path.join(settings.MEDIA_ROOT, "audio_files")
        os.makedirs(save_path, exist_ok=True)
        file_path = os.path.join(save_path, audio_file.name)

        with open(file_path, "wb") as f:
            f.write(audio_file.read())

        try:
            # Transcribe the audio
            transcription_result = transcribe_audio_with_openai(file_path)
            transcription_text = transcription_result.get("text", "").strip()

            if not transcription_text:
                return Response({"error": "Transcription failed. No text returned."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Get or create the session
            session, _ = EmergencySession.objects.get_or_create(session_id=session_id)

            # Save transcription to the database
            transcription = Transcription.objects.create(
                session=session,
                transcription_text=transcription_text
            )

            # Get detailed summaries as a JSON array
            detailed_summaries_gen = ai_generate_detailed_summary(
                transcription_text,
                context="Emergency response situation in progress."
            )
            detailed_summaries = list(detailed_summaries_gen)
            print("I am here")
            print(detailed_summaries)
            print(type(detailed_summaries))

            # Iterate over the summaries and save them to the database
            for summary in detailed_summaries:
                Summary.objects.create(
                    transcription=transcription,
                    summary_text=summary["message"],
                    sender=summary["sender"],
                    receiver=summary["receiver"],
                    category=summary["category"],
                    prioritized=summary["prioritized"],
                    suggested_question=summary["suggested_question"]
                )

            # Return the JSON array as the API response
            return Response({
                "session_id": session_id,
                "transcription_text": transcription_text,
                "summaries": detailed_summaries,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error in TranscriptionEndpoint: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class SummaryView(APIView):
    def get(self, request, session_id):
        """
        Retrieve summaries for a specific session, optionally filtering by a timestamp or new_only.
        """
        try:
            # Get the session
            session = EmergencySession.objects.get(session_id=session_id)

            # Parse the 'since' parameter from the querystring
            since = request.query_params.get("since")
            since_timestamp = None

            if since:
                logger.debug(f"Received 'since' parameter: {since}")
                sanitized_since = since.replace(" ", "+")  # Replace space with '+'
                since_timestamp = parse_datetime(sanitized_since)

                if since_timestamp and is_naive(since_timestamp):
                    since_timestamp = make_aware(since_timestamp)

                if not since_timestamp:
                    logger.warning(f"Invalid 'since' parameter: {since}")
                    return Response({"error": "Invalid 'since' parameter"}, status=status.HTTP_400_BAD_REQUEST)

            logger.debug(f"Parsed 'since' timestamp: {since_timestamp}")

            # Parse the 'new_only' parameter from the querystring
            new_only = request.query_params.get("new_only", "false").lower() == "true"

            # Filter transcriptions based on the timestamp
            transcriptions = Transcription.objects.filter(session=session)
            if since_timestamp:
                transcriptions = transcriptions.filter(created_at__gt=since_timestamp)

            logger.debug(f"Filtered transcriptions: {list(transcriptions)}")

            # Build response data
            summaries = []
            for transcription in transcriptions:
                try:
                    summary = transcription.summary
                    # Apply the 'new_only' filter
                    if new_only and not summary.is_new:
                        continue

                    summaries.append({
                        "id": str(summary.id),  # Convert UUID to string
                        "transcription_text": transcription.transcription_text,
                        "summary_message": summary.summary_text,
                        "sender": summary.sender,
                        "receiver": summary.receiver,
                        "category": summary.category,
                        "prioritized": summary.prioritized,
                        "suggested_question": summary.suggested_question,  # Include the field
                        "timestamp": transcription.created_at.isoformat(),
                        "is_new": summary.is_new
                    })
                except Summary.DoesNotExist:
                    logger.warning(f"No summary found for transcription {transcription.id}")

            logger.debug(f"Summaries to return: {summaries}")
            return Response({
                "session_id": session_id,
                "summaries": summaries,
            }, status=status.HTTP_200_OK)

        except EmergencySession.DoesNotExist:
            logger.error(f"Session not found: {session_id}")
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)



class MarkSummariesAsRead(APIView):
    def post(self, request):
        ids = request.data.get("ids", [])
        if not ids:
            return Response({"error": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST)

        summaries = Summary.objects.filter(id__in=ids)
        updated_count = summaries.update(is_new=False)

        return Response({
            "message": f"Marked {updated_count} summaries as read."
        }, status=status.HTTP_200_OK)
    
class MarkSummaryAsMarked(APIView):
    def post(self, request):
        id = request.data.get("id", None)  # Fetch the single ID
        if not id:
            return Response({"error": "No ID provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            summary = Summary.objects.get(id=id)
            summary.is_marked = True
            summary.save()
            return Response({
                "message": f"Marked summary {id} as marked."
            }, status=status.HTTP_200_OK)
        except Summary.DoesNotExist:
            return Response({"error": "Summary not found"}, status=status.HTTP_404_NOT_FOUND)
