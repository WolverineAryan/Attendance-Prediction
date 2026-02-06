import requests
from functools import lru_cache

OLLAMA_URL = "http://localhost:11434/api/generate"


# ---------- RAG STYLE SEARCH ----------
def search_relevant_rows(prompt, csv_text):
    """
    Return only CSV rows related to the user question.
    Acts as a mini RAG layer.
    """
    lines = csv_text.split("\n")
    keywords = prompt.lower().split()

    matches = [
        line for line in lines
        if any(k in line.lower() for k in keywords)
    ]

    # Limit to top 20 relevant rows
    return "\n".join(matches[:20])


# ---------- INTENT DETECTION ----------
def detect_intent(prompt):
    if not prompt:
        return "general"

    p = str(prompt).lower()

    if any(w in p for w in ["highest", "top", "best"]):
        return "top_students"

    if any(w in p for w in ["low", "risk", "danger"]):
        return "risk_analysis"

    if any(w in p for w in ["average", "mean", "stats", "statistics"]):
        return "statistics"

    return "general"



# ---------- SIMPLE STAT HANDLER ----------
def calculate_stats(csv_text):
    """
    Handle simple numeric questions without AI.
    Example: average attendance.
    """
    try:
        lines = csv_text.split("\n")[1:]  # skip header
        total = 0
        count = 0

        for line in lines:
            parts = line.split(",")
            for p in parts:
                if p.strip().isdigit():
                    total += int(p)
                    count += 1

        if count == 0:
            return "I couldn’t calculate statistics from the data."

        avg = round(total / count, 2)
        return f"The overall average numeric value in the data is about {avg}."

    except Exception:
        return "I’m unable to calculate statistics from this data."


# ---------- CACHING LAYER ----------
@lru_cache(maxsize=100)
def cached_ai_answer(prompt, context):
    return ask_ollama_core(prompt, context)


# ---------- MAIN CHATBOT LOGIC ----------
def ask_ollama(prompt, csv_text, history=None):
    """
    Main entry point with:
    - intent detection
    - RAG search
    - caching
    """

    if history is None:
        history = []

    # Detect intent first
    intent = detect_intent(prompt)

    # If simple stats question, answer without AI
    if intent == "statistics":
        return calculate_stats(csv_text)

    # Use RAG to extract only relevant rows
    context = search_relevant_rows(prompt, csv_text)

    # If RAG found nothing, fallback to small slice
    if not context.strip():
        context = csv_text[:4000]

    # Use cached response if available
    answer = cached_ai_answer(prompt, context)

    # Save to history
    history.append({"user": prompt, "andy": answer})
    history.clear()  # Clear history to save memory, or implement a smarter history management

    return answer


# ---------- CORE AI CALL ----------
def ask_ollama(prompt, csv_text, history=None):

    if not prompt:
        return "Please ask me a question."

    prompt = str(prompt).strip()

    # Use RAG to extract only relevant rows
    context = search_relevant_rows(prompt, csv_text)

    # If RAG found nothing, fallback to small slice
    if not context.strip():
        context = csv_text[:4000]

    system_prompt = f"""
You are ANDY – a smart assistant for attendance analytics.

ROLE:
- You answer ONLY the user question.
- Do NOT summarize the whole dataset.
- Do NOT give general trends unless asked.

TONE RULES:
- Reply like a real helpful human.
- Be polite and friendly.
- Use very short answers.
- Avoid long explanations.

STRICT ANSWERING RULES:
- Read the user question carefully.
- Respond ONLY to what is asked.
- Do NOT add extra statistics.
- Do NOT list unrelated rows.

FORMAT RULES:
- Prefer 1–3 short sentences.
- Use bullet points only if needed.
- Never start with long introductions.

EXAMPLES OF GOOD ANSWERS:

User: "Who has low attendance?"
Andy: These students have attendance below 60%:  
- Rohan Patil – 42%  
- Neha Rao – 55%

User: "How many students are high risk?"
Andy: 7 students are currently marked as high risk.

User: "Give me low attendance list"
Andy: Here are the students with low attendance:  
- Aman – 48%  
- Pooja – 51%

DATA RULES:
- Answer ONLY using the data below.
- If the information is not available, say:
  "I cannot find that information in the attendance data."

RELEVANT DATA:
{context}

User question:
{prompt}

Answer as ANDY (direct and concise):
"""

    payload = {
        "model": "llama3",
        "prompt": system_prompt,
        "stream": False,
        "options": {
            "temperature": 0.25,
            "top_p": 0.8,
            "max_tokens": 200
        }
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=30)

        if response.status_code != 200:
            print("OLLAMA ERROR:", response.text)
            return "Sorry, I’m having trouble connecting to my AI engine."

        data = response.json()
        answer = data.get("response", "").strip()

        answer = answer.replace("Answer:", "").strip()

        return answer

    except requests.exceptions.Timeout:
        return "Hmm… the AI is taking too long to respond."

    except Exception as e:
        print("CHATBOT EXCEPTION:", e)
        return "I’m unable to respond right now. Please try again later."
