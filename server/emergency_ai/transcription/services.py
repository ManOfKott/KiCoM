from openai import OpenAI
from django.conf import settings

# Initialize OpenAI client with the API key
client = OpenAI(api_key=settings.OPENAI_API_KEY)

def transcribe_audio_with_openai(file_path):
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
        return response  # Returns the transcription object with the `text` field
