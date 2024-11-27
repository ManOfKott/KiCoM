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

        audio_file = request.FILES.get('audio')
        if not audio_file:
            return Response({"error": "No audio file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Save the file to a specific directory under MEDIA_ROOT
        save_path = os.path.join(settings.MEDIA_ROOT, 'audio_files')
        os.makedirs(save_path, exist_ok=True)
        file_path = os.path.join(save_path, audio_file.name)

        with open(file_path, "wb") as f:
            f.write(audio_file.read())

        try:
            # Transcribe the audio
            transcription_result = transcribe_audio_with_openai(file_path)
            transcription_text = transcription_result.text

            # Get or create the session
            session, created = EmergencySession.objects.get_or_create(session_id=session_id)

            # Save transcription to the database
            transcription = Transcription.objects.create(
                session=session,
                transcription_text=transcription_text
            )

            # Generate a detailed summary for this transcription
            detailed_summary = ai_generate_detailed_summary(transcription_text, context="Emergency response situation in progress.")

            # Save the summary to the database
            Summary.objects.create(
                transcription=transcription,
                summary_text=detailed_summary.get("message", "No content provided."),
                sender=detailed_summary.get("sender", "Unknown"),
                receiver=detailed_summary.get("receiver", "Unknown"),
                category=detailed_summary.get("category", "General"),
                priority=detailed_summary.get("priority", "Low"),
            )

            # Include the transcription's timestamp in the response
            response_data = {
                **detailed_summary,
                "timestamp": transcription.created_at.isoformat()
            }

            # Return the detailed summary as the API response
            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error in TranscriptionEndpoint: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SummaryView(APIView):
    def get(self, request, session_id):
        """
        Retrieve summaries for a specific session, optionally filtering by a timestamp.
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
                    summaries.append({
                        "transcription_text": transcription.transcription_text,
                        "summary_message": summary.summary_text,
                        "sender": summary.sender,
                        "receiver": summary.receiver,
                        "category": summary.category,
                        "priority": summary.priority,
                        "timestamp": transcription.created_at.isoformat(),
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




