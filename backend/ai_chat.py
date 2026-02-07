import requests
from functools import lru_cache

OLLAMA_URL = "http://localhost:11434/api/generate"


# ---------- RAG STYLE SEARCH (IMPROVED) ----------
def search_relevant_rows(prompt, csv_text):
    lines = csv_text.split("\n")

    prompt = prompt.lower()
    keywords = prompt.replace("?", "").split()

    scored = []

    for line in lines:
        score = 0
        line_lower = line.lower()

        for k in keywords:
            if k in line_lower:
                score += 1

        if score > 0:
            scored.append((score, line))

    # Sort by relevance score
    scored.sort(reverse=True, key=lambda x: x[0])

    top_lines = [line for score, line in scored[:25]]

    return "\n".join(top_lines)


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

    if "summary" in p:
        return "summary"

    return "general"


# ---------- SIMPLE STAT HANDLER ----------
def calculate_stats(csv_text):
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


# ---------- CSV SUMMARIZATION ----------
def summarize_csv(csv_text):
    try:
        lines = csv_text.strip().split("\n")

        if len(lines) < 2:
            return "The uploaded CSV seems empty or invalid."

        total_rows = len(lines) - 1  # minus header
        headers = lines[0].split(",")

        return f"""
📊 DATASET SUMMARY

- Total records: {total_rows}
- Columns: {", ".join(headers)}

You can ask questions like:

• How many students are high risk?
• Who has lowest attendance?
• Average attendance?
• Show top 5 students by attendance
"""
    except Exception:
        return "Unable to generate summary from the dataset."


# ---------- CACHING LAYER ----------
@lru_cache(maxsize=100)
def cached_ai_answer(prompt, context):
    return ask_ollama_core(prompt, context)


# ---------- CORE AI CALL ----------
def ask_ollama_core(prompt, context):

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
-respond only to the question asked and not give extra data and just give the sufficient answer
- Do NOT add extra statistics.
- Do NOT list unrelated rows.

FORMAT RULES:
- Prefer 1–3 short sentences.
- Use bullet points only if needed.
- Never start with long introductions.

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
            "temperature": 0.2,
            "top_p": 0.7,
            "max_tokens": 150
        }
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=120)

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


# ---------- MAIN CHATBOT LOGIC ----------
def ask_ollama(prompt, csv_text, history=None):

    # BLOCK ANSWERS IF NO CSV UPLOADED
    if not csv_text or csv_text.strip() == "":
        return "Please upload a CSV file first so I can analyze attendance data."

    if not prompt:
        return "Please ask me a question."

    prompt = str(prompt).strip()

    intent = detect_intent(prompt)

    # SUMMARY REQUEST
    if intent == "summary":
        return summarize_csv(csv_text)

    # SIMPLE STAT QUESTIONS
    if intent == "statistics":
        return calculate_stats(csv_text)

    # USE RAG TO GET RELEVANT ROWS
    context = search_relevant_rows(prompt, csv_text)

    # If RAG found nothing, fallback to small slice
    if not context.strip():
        context = csv_text[:4000]

    # Use cached AI response
    answer = cached_ai_answer(prompt, context)

    return answer
