from openai import OpenAI
from app.config import GROQ_API_KEY
import os
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def generate_plan(sessions):
    summary = ""

    for s in sessions:
        summary += f"{s.subject} - {s.topic} ({s.duration} min)\n"

    prompt = f"""
You are a UPSC mentor.

Today's study summary:
{summary}

Suggest:
1. What to revise tomorrow
2. What new topics to study
3. A structured plan (hour-wise)

Keep it concise and practical.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    return response.choices[0].message.content