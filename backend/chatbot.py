import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def ask_ollama(prompt, csv_text):
    full_prompt = f"""
You are an AI assistant for Attendance Prediction System.

CSV DATA:
{csv_text}

User Question:
{prompt}

Answer only based on the data above.
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama3",
            "prompt": full_prompt,
            "stream": False
        }
    )

    return response.json()["response"]
