import requests
import time
from datetime import datetime, timedelta

BASE_URL = "http://127.0.0.1:8000/api"  # Replace with your actual server URL
SESSION_ID = "test-session-1"
AUDIO_FILES = [
    "test_media/test_audio.m4a",
    "test_media/test_audio1.m4a",
    "test_media/test_audio2.m4a"
]

def upload_audio_files():
    """Upload multiple audio files to the server."""
    for audio_file in AUDIO_FILES:
        with open(audio_file, "rb") as audio:
            response = requests.post(
                f"{BASE_URL}/transcribe/",
                files={"audio": audio},
                data={"session_id": SESSION_ID},
            )
            if response.status_code == 200:
                print(f"Uploaded {audio_file}: {response.json()}")
            else:
                print(f"Failed to upload {audio_file}: {response.status_code}, {response.text}")

def fetch_summaries(since=None, new_only=False):
    """Fetch summaries for the session with optional filters."""
    url = f"{BASE_URL}/summary/{SESSION_ID}/"
    params = {}
    if since:
        params["since"] = since
    if new_only:
        params["new_only"] = "true"

    response = requests.get(url, params=params)
    if response.status_code == 200:
        summaries = response.json().get("summaries", [])
        print(f"Fetched summaries: {summaries}")
        return summaries
    else:
        print(f"Failed to fetch summaries: {response.status_code}, {response.text}")
        return []

def mark_summaries_as_read(summary_ids):
    """Mark specific summaries as read (set `is_new` to `False`)."""
    response = requests.post(
        f"{BASE_URL}/mark-as-read/",
        json={"ids": summary_ids}
    )
    if response.status_code == 200:
        print(f"Marked summaries as read: {response.json()}")
    else:
        print(f"Failed to mark summaries as read: {response.status_code}, {response.text}")

def main():
    # Step 1: Upload audio files
    print("Uploading audio files...")
    upload_audio_files()

    # Step 2: Fetch all summaries and check `is_new` flags
    print("\nFetching all summaries initially...")
    summaries = fetch_summaries()
    
    # Collect IDs of summaries that are marked as not new
    new_summary_ids = [summary["id"] for summary in summaries if summary.get("is_new", False)]
    print(f"New summaries: {new_summary_ids}")

    # Step 3: Fetch only new summaries
    print("\nFetching only new summaries...")
    new_summaries = fetch_summaries(new_only=True)
    print(f"New summaries fetched: {new_summaries}")

    # Step 4: Mark some summaries as read
    if new_summary_ids:
        print("\nMarking some summaries as read...")
        mark_summaries_as_read(new_summary_ids[:1])  # Mark the first new summary as read

    # Step 5: Fetch summaries again and check `is_new` flags
    print("\nFetching summaries after marking as read...")
    updated_summaries = fetch_summaries()
    print(f"Updated summaries: {updated_summaries}")

    # Step 6: Simulate periodic polling with `since` parameter
    if updated_summaries:
        latest_timestamp = updated_summaries[-1]["timestamp"]
    else:
        latest_timestamp = (datetime.now() - timedelta(minutes=10)).isoformat()

    print("\nSimulating periodic polling with 'since' parameter...")
    for _ in range(5):  # Poll 5 times
        time.sleep(5)  # Simulate a 5-second delay between requests
        print(f"\nFetching summaries since {latest_timestamp}...")
        summaries = fetch_summaries(since=latest_timestamp)

        # Update `latest_timestamp` if new summaries are received
        if summaries:
            latest_timestamp = summaries[-1]["timestamp"]

if __name__ == "__main__":
    main()
