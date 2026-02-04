import requests
from langchain_community.llms import OllamaLLM
from langchain_ollama import OllamaLLM
ai = OllamaLLM(model="llama3")

# Ollama API URL
OLLAMA_URL = "http://localhost:11434/api/generate"

# Local AI model instance (optional direct use)
ai = OllamaLLM(model="llama3")

# Simple direct question function
def ask_ai(question):
    return ai(question)

# Main function used by chatbot
def ask_ollama(prompt, csv_text):
    try:
        full_prompt = f"""
You are a smart assistant for attendance analytics.

Use ONLY the data below to answer.

CSV DATA:
{csv_text}

User question: {prompt}

INSTRUCTIONS:
-your name is Andy
- Give only key facts.
- give short explanations.
- Be concise.

Answer:
"""

        payload = {
            "model": "llama3",
            "prompt": full_prompt,
            "stream": False
        }

        response = requests.post(OLLAMA_URL, json=payload)

        if response.status_code != 200:
            print("OLLAMA ERROR:", response.text)
            return "AI server error"

        data = response.json()

        return data.get("response", "No AI response")

    except Exception as e:
        print("CHATBOT EXCEPTION:", e)
        return "No response (Ollama not reachable)"

