import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

# ================= PLAN =================
def generate_plan(sessions):
    summary = ""
    for s in sessions:
        summary += f"{s.subject} - {s.topic} ({s.duration} min)\n"

    prompt = f"""
You are a UPSC mentor.

Today's study:
{summary}

Create a plan for tomorrow.
"""

    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return res.choices[0].message.content


# ================= CHAT =================
def chat_ai(question):
    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": question}]
    )

    return res.choices[0].message.content


# ================= STRATEGY =================
def generate_strategy(sessions):
    summary = ""
    for s in sessions:
        summary += f"{s.subject} - {s.duration} min\n"

    prompt = f"""
Analyze UPSC preparation:

{summary}

Give:
1. Weak areas
2. Strong areas
3. Prelims strategy
4. Mains answer writing strategy
"""

    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return res.choices[0].message.content