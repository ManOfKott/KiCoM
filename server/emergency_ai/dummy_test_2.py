import requests

BASE_URL = "http://127.0.0.1:8000/api"  # Adjust as needed
response = requests.post(
    f"{BASE_URL}/mark-as-read/",
    json={"ids": [1, 2, 3]}  # Replace with valid summary IDs
)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.json()}")
