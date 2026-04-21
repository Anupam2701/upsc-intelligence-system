from pydantic import BaseModel
from datetime import date
from typing import Optional

class StudySessionCreate(BaseModel):
    date: date
    subject: str
    topic: str
    duration: int
    quality_score: int
    revision: bool

    # 🔥 TIME
    start_time: Optional[str] = None
    end_time: Optional[str] = None

    # 🔥 NEW EXAM
    exam: Optional[str] = "UPSC CSE"