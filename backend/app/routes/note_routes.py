from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.note import Note
from app.schemas.note import NoteCreate, NoteUpdate

router = APIRouter(prefix="/notes", tags=["Notes"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ CREATE NOTE
@router.post("/")
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    new_note = Note(
        exam=note.exam,  # 🔥 ADD
        subject=note.subject,
        topic=note.topic,
        reference=note.reference,
        subtopic=note.subtopic,
        title=note.title,
        content=note.content,
        type="concept"
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note


# ✅ GET ALL NOTES (FILTER SUPPORT)
@router.get("/")
def get_notes(exam: str, db: Session = Depends(get_db)):
    return db.query(Note).filter(Note.exam == exam).all()


# ✅ GET UNIQUE SUBJECTS (🔥 IMPORTANT)
@router.get("/subjects")
def get_subjects(exam: str, db: Session = Depends(get_db)):
    subjects = (
        db.query(Note.subject)
        .filter(Note.exam == exam)
        .distinct()
        .all()
    )

    return [s[0] for s in subjects]


# ✅ UPDATE NOTE
@router.put("/{note_id}")
def update_note(note_id: int, data: NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        return {"error": "Not found"}

    note.title = data.title
    note.content = data.content

    db.commit()
    return {"msg": "updated"}


# ✅ DELETE NOTE
@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        return {"error": "Not found"}

    db.delete(note)
    db.commit()

    return {"msg": "deleted"}