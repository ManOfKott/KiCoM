import json
import re
import logging
from openai import OpenAI
from django.conf import settings
from .models import Summary

logger = logging.getLogger(__name__)

# Initialize the OpenAI client
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


def ai_generate_detailed_summary(transcription_text, context=""):
    """
    Generates a detailed summary with sender, receiver, message, category, priority, and suggested question.
    """
    if not transcription_text.strip():
        logger.warning("Empty transcription text provided. Skipping AI summarization.")
        return {
            "sender": "Unknown",
            "receiver": "Unknown",
            "message": "No content provided.",
            "category": "General",
            "prioritized": "False",
            "suggested_question": "Could you provide more details about this?",
        }

    prompt = f"""
You are an assistant helping with emergency response transcription. The text provided includes transcribed emergency communications.

Your task is to:
1. Identify the sender of the message. This is usually a code at the start of the message, e.g., "Frankfurt 4".
2. Identify the receiver of the message. This is usually a code at the end of the message, e.g., "Control".
3. Summarize all relevant details from the transcription into one cohesive message. Keep the summary concise.
4. Assign a category to the message based on its content (e.g., "Fire", "Medical Emergency", "Traffic Incident").
5. Assign a priority level to the message True or False based on its urgency, True means is prioritized.
6. Suggest one relevant question to ask next based on the content of the transcription.

Here is the transcription text:
{transcription_text}

Additional context (if available):
{context}

Please return the result in this JSON format:
{{
    "sender": "Frankfurt 4",
    "receiver": "Control",
    "message": "There is a fire at the west end.",
    "category": "Fire",
    "prioritized": "True",
    "suggested_question": "What is the extent of the fire damage?"
}}
    """

    try:
        # Call the OpenAI API
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        response_content = completion.choices[0].message.content.strip()

        # Use regex to extract the JSON part
        json_match = re.search(r"\{.*\}", response_content, re.DOTALL)  # Match JSON within the response
        if json_match:
            json_content = json_match.group()
            response_data = json.loads(json_content)  # Parse JSON output
            return response_data
        else:
            raise ValueError("No JSON content found in the LLM response.")

    except (json.JSONDecodeError, ValueError) as e:
        logger.error(f"Error generating detailed summary with AI: {e}")
        logger.error(f"Response content: {response_content}")
        return {
            "sender": "Unknown",
            "receiver": "Unknown",
            "message": "Error generating summary.",
            "category": "General",
            "priority": "Low",
            "suggested_question": "What additional information can you provide?",
        }

