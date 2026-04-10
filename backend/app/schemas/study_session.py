from pydantic import BaseModel
from datetime import date

class StudySessionCreate(BaseModel):
    date: date
    subject: str
    topic: str
    duration: int
    quality_score: int
    revision: bool