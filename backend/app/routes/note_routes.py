from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.note import Note
from app.schemas.note import NoteCreate
from pydantic import BaseModel

class NoteUpdate(BaseModel):
    title: str
    content: str

router = APIRouter(prefix="/notes")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE
@router.post("/")
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    new_note = Note(**note.dict())
    db.add(new_note)
    db.commit()
    return {"msg": "Note added"}

# GET ALL
@router.get("/")
def get_notes(db: Session = Depends(get_db)):
    return db.query(Note).order_by(Note.created_at.desc()).all()

# FILTER
@router.get("/filter")
def filter_notes(subject: str = None, type: str = None, db: Session = Depends(get_db)):
    query = db.query(Note)

    if subject:
        query = query.filter(Note.subject == subject)

    if type:
        query = query.filter(Note.type == type)

    return query.all()

@router.get("/structured")
def structured_notes(db: Session = Depends(get_db)):
    notes = db.query(Note).all()

    result = {}

    for note in notes:
        subject = note.subject
        topic = note.topic
        note_type = note.type

        if subject not in result:
            result[subject] = {}

        if topic not in result[subject]:
            result[subject][topic] = {
                "concept": [],
                "revision": [],
                "mistake": [],
                "pyq": []
            }

        result[subject][topic][note_type].append({
            "id": note.id,
            "title": note.title,
            "content": note.content,
            "subject": note.subject,
            "topic": note.topic,
            "type": note.type
        })

    return result

@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        return {"error": "Note not found"}

    db.delete(note)
    db.commit()

    return {"msg": "Deleted"}

@router.put("/{note_id}")
def update_note(note_id: int, updated: NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        return {"error": "Note not found"}

    note.title = updated.title
    note.content = updated.content

    db.commit()

    return {"msg": "Updated"}