import os
import requests

# Server details
BASE_URL = "http://127.0.0.1:8000"
TRANSCRIBE_ENDPOINT = f"{BASE_URL}/api/transcribe/"
SUMMARY_ENDPOINT = f"{BASE_URL}/api/summary/test-session-1/"

# Resolve paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))  # Directory of this script
MEDIA_DIR = os.path.join(SCRIPT_DIR, "test_media")  # Folder for test audio files
AUDIO_FILE_PATH = os.path.join(MEDIA_DIR, "test_audio.m4a")  # Replace with your actual audio file name

# Ensure test_media and audio file exist
if not os.path.exists(MEDIA_DIR):
    raise FileNotFoundError(f"Media directory not found: {MEDIA_DIR}")
if not os.path.exists(AUDIO_FILE_PATH):
    raise FileNotFoundError(f"Test audio file not found: {AUDIO_FILE_PATH}")


def test_transcription():
    """Simulate uploading an audio file and retrieving a summary"""
    session_id = "test-session-1"

    # Step 1: Call the Transcription API
    with open(AUDIO_FILE_PATH, "rb") as audio_file:
        print("Sending transcription request...")
        response = requests.post(
            TRANSCRIBE_ENDPOINT,
            files={"audio": audio_file},
            data={"session_id": session_id}
        )
    
    # Check transcription response
    if response.status_code == 200:
        print("Transcription successful!")
        print("Response JSON:", response.json())
    else:
        print("Transcription failed!")
        print("Error Response:", response.status_code, response.json())
        return

    # Step 2: Call the Summary API to retrieve all summaries
    print("Fetching all summaries for the session...")
    response = requests.get(SUMMARY_ENDPOINT)

    # Check summary response
    if response.status_code == 200:
        print("\nSummary retrieval successful!")
        print("Response JSON:", response.json())
    else:
        print("\nSummary retrieval failed!")
        print("Error Response:", response.status_code, response.json())


if __name__ == "__main__":
    test_transcription()
