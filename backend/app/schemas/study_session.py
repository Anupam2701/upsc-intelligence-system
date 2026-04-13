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

    # 🔥 NEW
    start_time: Optional[str] = None
    end_time: Optional[str] = None