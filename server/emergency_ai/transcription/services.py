import json
import re
import logging
from openai import OpenAI
from django.conf import settings
from .models import Summary
import ast

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
        # Ensure the response is returned as a dictionary with a 'text' field
        return {"text": response.text}


def ai_generate_detailed_summary(transcription_text, context=""):
    """
    Generates a detailed summary of emergency communication transcripts. Each message is parsed into 
    individual JSON objects with fields: sender, receiver, message, category, priority, and suggested question.
    Returns a list of messages.
    """
    summaries = []  # Initialize an empty list to store the summaries

    if not transcription_text.strip():
        logger.warning("Empty transcription text provided. Skipping AI summarization.")
        summaries.append({
            "sender": "Unknown",
            "receiver": "Unknown",
            "message": "No content provided.",
            "category": "General",
            "prioritized": "False",
            "suggested_question": "Could you provide more details about this?",
        })
        return summaries  # Return the list immediately

    prompt = f"""
You are an assistant helping with emergency response transcription. Your task is to analyze the transcription and extract detailed summaries of individual communications. Each communication consists of a sender, a receiver, and a specific message. Based on the transcription:

### Instructions:
1. **Identify Sender and Receiver**:
    - Determine the sender and receiver for each message. Use codes like:
      - ANGRIFFSTRUPP ("AT"), WASSERTRUPP ("WT"), SCHLAUCHTRUPP ("ST"), GRUPPENFÜHRER ("GF"),
        MASCHINIST ("MA"), ZUGFÜHRER ("ZF"), EINSATZLEITER ("EL"), MELDER ("MD").
    - Choose the most pllausible sender and receiver based on the message.
    - The sender and the receiver can not be the same person.

2. **Segment Messages**:
    - Divide the transcription into distinct interactions. Start and end points are typically marked by "Kommen" or "Ende".
    - Each interaction should be processed as an individual message.

3. **Summarize Content**:
    - Create a concise summary of the message for each interaction.
    - Ignore filler words like "Ja", "Verstanden", "Ende".
    - Focus on the core content of the message.
    

4. **Categorize**:
    - Assign a category to each message based on its content. Example categories:
      - "Kommunikation herstellen" (Establish Communication),
      - "Anfrage Ausrüstung" (Request Equipment),
      - "Feuer" (Fire),
      - "Notfall medizinisch" (Medical Emergency).

5. **Set Priority**:
    - Mark priority as "True" for urgent messages (e.g. life-threatening scenarios and scenarios that can lead to the loss of life).
    - Otherwise, use "False".

6. **Suggest Questions**:
    - Suggest a relevant follow-up question based on the context of the message.

### Example Transcription:
Transcription: 
Schlauchtrupp HLF und Gruppenführer kommen. 
Hier Schlauchtrupp HLF kommen. 
Ja, bitte bringen Sie den Haupteingang Drucklüfter in Stellung zur Entrauchung des Gebäudes. 
Kommen. Verstanden. Lüfter vor den Haupteingang zum Entrauchen des Gebäudes. Ja, so richtig. Ende.

### Example Output:
[
    {{
        "sender": "ST",
        "receiver": "GF",
        "message": "Schlauchtrupp fordert Gruppenführer zum kommen an",
        "category": "Kommunikation herstellen",
        "prioritized": "False",
        "suggested_question": ""
    }},
    {{
        "sender": "GF",
        "receiver": "ST",
        "message": "Gruppenführer bestätigt Funkaufbau",
        "category": "Kommunikation herstellen",
        "prioritized": "False",
        "suggested_question": ""
    }},
    {{
        "sender": "ST",
        "receiver": "GF",
        "message": "Drucklüfter zum Haupteingang bringen",
        "category": "Anfrage Ausrüstung",
        "prioritized": "True",
        "suggested_question": "Brauchen Sie zusätzliche Ausrüstung?"
    }},
    {{
        "sender": "GF",
        "receiver": "ST",
        "message": "Bestaetigt die Bringung des Luefters",
        "category": "Anfrage Ausrüstung",
        "prioritized": "True",
        "suggested_question": "Brauchen Sie zusätzliche Ausrüstung?"
    }}
]

### Transcription for Analysis:
{transcription_text}

### Additional Context (if available):
{context}

### Required JSON Format:
Return an array of messages, each with:
- "sender": The code for the sender (e.g., "ST").
- "receiver": The code for the receiver (e.g., "GF").
- "message": The specific interaction message in German.
- "category": The category assigned to the message (in German).
- "prioritized": "True" or "False" based on urgency.
- "suggested_question": A relevant follow-up question (in German).
"""

    try:
        # Call OpenAI API and process
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": prompt}],
        )
        response_content = completion.choices[0].message.content.strip()
        print(f"Raw API response content: {response_content}")

        # Slice the string from the first '[' to the last ']'
        start_idx = response_content.find("[")
        end_idx = response_content.rfind("]") + 1  # Include the closing bracket

        json_content = response_content[start_idx:end_idx]
        print(f"Sliced JSON content: {json_content}")

        summaries = ast.literal_eval(json_content)  # Convert JSON to a Python list

    except Exception as e:
        logger.error(f"Error generating summary: {e}")
        summaries.append({
            "sender": "Unknown",
            "receiver": "Unknown",
            "message": "Error generating summary.",
            "category": "General",
            "prioritized": "True",
            "suggested_question": "Could you provide more details about this?",
        })

    return summaries  # Return the collected summaries
