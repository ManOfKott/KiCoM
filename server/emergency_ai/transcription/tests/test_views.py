import logging
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from transcription.models import EmergencySession, Transcription, Summary
import os
from datetime import timedelta, datetime
from django.utils.timezone import now
# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


import logging
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from transcription.models import EmergencySession, Transcription, Summary
import os
from unittest.mock import patch

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

import logging
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from transcription.models import EmergencySession, Transcription, Summary
import os
from unittest.mock import patch

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class TranscriptionAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.transcribe_url = reverse("transcribe")
        self.audio_file_path = os.path.join(os.path.dirname(__file__), "test_files", "test_audio.m4a")

        # Ensure the test audio file exists
        if not os.path.exists(self.audio_file_path):
            # Create a dummy audio file for testing purposes
            with open(self.audio_file_path, "wb") as f:
                f.write(b"Dummy audio content")

    @patch('transcription.views.transcribe_audio_with_openai')
    def test_transcription_endpoint(self, mock_transcribe_audio_with_openai):
        """Test successful transcription and detailed summary generation"""
        # Mock the return value of the transcription function
        mock_transcribe_audio_with_openai.return_value = type(
            "MockTranscriptionResult", 
            (object,), 
            {"text": "Frankfurt 4: There's a fire at the west end. Control: Copy that."}
        )()

        with open(self.audio_file_path, "rb") as audio:
            response = self.client.post(
                self.transcribe_url,
                {"audio": audio, "session_id": "test-session-1"},
                format="multipart"
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check response keys
        expected_keys = {"sender", "receiver", "message", "category", "priority", "timestamp"}
        self.assertTrue(expected_keys.issubset(response.data.keys()))

        # Verify database entries
        session = EmergencySession.objects.get(session_id="test-session-1")
        transcription = Transcription.objects.get(session=session)
        summary = Summary.objects.get(transcription=transcription)

        # Check database values
        self.assertEqual(summary.sender, response.data["sender"])
        self.assertEqual(summary.receiver, response.data["receiver"])
        self.assertEqual(summary.category, response.data["category"])
        self.assertEqual(summary.priority, response.data["priority"])
        self.assertEqual(summary.summary_text, response.data["message"])
        self.assertEqual(transcription.created_at.isoformat(), response.data["timestamp"])



    def test_missing_audio_file(self):
        """Test error handling for missing audio file"""
        response = self.client.post(self.transcribe_url, {"session_id": "test-session-1"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("No audio file provided", response.data["error"])
        logger.debug(f"Error Response: {response.data}")



class SummaryAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.summary_url = reverse("summary", args=["test-session-1"])
        
        # Create a session
        self.session = EmergencySession.objects.create(session_id="test-session-1")
        
        # Create initial transcriptions and summaries
        self.transcription1 = Transcription.objects.create(
            session=self.session,
            transcription_text="Frankfurt 4: There's a fire at the west end. Control: Copy that.",
            created_at=now() - timedelta(minutes=10),
        )
        self.summary1 = Summary.objects.create(
            transcription=self.transcription1,
            summary_text="There is a fire at the west end."
        )

        self.transcription2 = Transcription.objects.create(
            session=self.session,
            transcription_text="Berlin 8: Injuries reported at Main Street. Control: Sending ambulance.",
            created_at=now() - timedelta(minutes=5),
        )
        self.summary2 = Summary.objects.create(
            transcription=self.transcription2,
            summary_text="Injuries reported at Main Street."
        )

    def test_fetch_all_summaries(self):
        """Test fetching all summaries for a session"""
        response = self.client.get(self.summary_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        summaries = response.data["summaries"]
        self.assertEqual(len(summaries), 2)

        logger.debug(f"All Summaries Response: {response.data}")

    def test_fetch_summaries_since(self):
        """Test fetching summaries created after a specific timestamp"""
        since_timestamp = self.transcription1.created_at.isoformat()  # Ensures correct format
        logger.debug(f"Using 'since' timestamp: {since_timestamp}")
    
        response = self.client.get(f"{self.summary_url}?since={since_timestamp}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
        summaries = response.data["summaries"]
        logger.debug(f"Summaries fetched: {summaries}")
    
        self.assertEqual(len(summaries), 1)  # Only the second summary should be returned
        self.assertEqual(summaries[0]["transcription_text"], self.transcription2.transcription_text)
        self.assertEqual(summaries[0]["summary_message"], self.summary2.summary_text)




    def test_no_summaries_after_timestamp(self):
        """Test fetching summaries when no new ones exist after the given timestamp"""
        # Use a future timestamp
        future_timestamp = (now() + timedelta(minutes=10)).isoformat()
        logger.debug(f"Future 'since' timestamp: {future_timestamp}")

        response = self.client.get(f"{self.summary_url}?since={future_timestamp}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        summaries = response.data["summaries"]
        self.assertEqual(len(summaries), 0)  # No summaries should be returned

        logger.debug(f"No Summaries After Future Timestamp Response: {response.data}")
