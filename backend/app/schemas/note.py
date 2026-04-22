from pydantic import BaseModel
from typing import Optional

class NoteCreate(BaseModel):
    exam: Optional[str] = "UPSC CSE"  # 🔥 NEW
    subject: str
    topic: str
    reference: str
    subtopic: str
    title: str
    content: str
    type: Optional[str] = "concept"


class NoteUpdate(BaseModel):
    title: str
    content: str