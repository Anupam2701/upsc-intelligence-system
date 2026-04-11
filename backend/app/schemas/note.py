from pydantic import BaseModel
from typing import Optional

class NoteCreate(BaseModel):
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