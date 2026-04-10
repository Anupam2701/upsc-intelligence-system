from pydantic import BaseModel

class NoteCreate(BaseModel):
    title: str
    content: str
    subject: str
    topic: str
    type: str

class NoteOut(NoteCreate):
    id: int

    class Config:
        orm_mode = True

class NoteUpdate(BaseModel):
    title: str
    content: str