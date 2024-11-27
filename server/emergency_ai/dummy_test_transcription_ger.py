import json
import re
import logging
from openai import OpenAI
from dotenv import load_dotenv
import os

logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def transcribe_audio(file_path):
    """
    Transcribes an audio file using OpenAI's Whisper API.
    Args:
        file_path (str): Path to the audio file.
    Returns:
        dict: Transcription result with text.
    """
    with open(file_path, "rb") as audio_file:
        response = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
        return response.text  # Returns the transcription text

if __name__ == "__main__":
    # Replace 'test_audio.mp3' with the path to your audio file
    audio_file = r"C:\Users\kenak\Desktop\PMRExpo client\AI-Chaos-Management\server\emergency_ai\test_media\Feuerwehr 4.m4a"
    print(os.path.exists(audio_file))
    transcription = transcribe_audio(audio_file)
    print(f"Transcription: {transcription}")
