from pydantic import BaseModel
from datetime import date

class TodoCreate(BaseModel):
    text: str
    date: date
    type: str

class TodoResponse(BaseModel):
    id: int
    text: str
    date: date
    type: str
    completed: bool

    class Config:
        orm_mode = True