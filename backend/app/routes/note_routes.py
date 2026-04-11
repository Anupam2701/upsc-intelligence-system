from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.note import Note
from app.schemas.note import NoteCreate, NoteUpdate

router = APIRouter(prefix="/notes")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ CREATE
@router.post("/")
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    new_note = Note(
        subject=note.subject or "",
        topic=note.topic or "",
        reference=note.reference or "",
        subtopic=note.subtopic or "",
        title=note.title,
        content=note.content,
        type=note.type or "concept"
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note


# ✅ GET ALL
@router.get("/")
def get_notes(db: Session = Depends(get_db)):
    return db.query(Note).all()


# ✅ UPDATE
@router.put("/{note_id}")
def update_note(note_id: int, data: NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        return {"error": "Not found"}

    note.title = data.title
    note.content = data.content

    db.commit()
    return {"msg": "updated"}


# ✅ DELETE
@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        return {"error": "Not found"}

    db.delete(note)
    db.commit()

    return {"msg": "deleted"}