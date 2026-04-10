from pydantic import BaseModel

class NoteCreate(BaseModel):
    title: str
    content: str
    subject: str
    topic: str

    # 🔥 NEW
    reference: str
    subtopic: str

    type: str = "concept"


class NoteUpdate(BaseModel):
    title: str
    content: str