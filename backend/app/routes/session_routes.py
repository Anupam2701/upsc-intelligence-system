from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.study_session import StudySession
from app.schemas.study_session import StudySessionCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ CREATE
@router.post("/")
def create_session(session: StudySessionCreate, db: Session = Depends(get_db)):
    if not session.subject or not session.start_time or not session.end_time:
        return {"error": "Missing required fields"}

    db_session = StudySession(**session.dict())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)

    return db_session


# ✅ GET ALL (ORDERED)
@router.get("/")
def get_sessions(db: Session = Depends(get_db)):
    return db.query(StudySession).order_by(StudySession.created_at.desc()).all()


# ✅ ANALYTICS (UPGRADED)
@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    sessions = db.query(StudySession).all()

    total = sum(s.duration for s in sessions)

    subject_data = {}
    daily_data = {}

    for s in sessions:
        subject_data[s.subject] = subject_data.get(s.subject, 0) + s.duration
        daily_data[s.date] = daily_data.get(s.date, 0) + s.duration

    return {
        "total_minutes": total,
        "subject_wise": subject_data,
        "daily_progress": daily_data
    }


# ✅ DELETE
@router.delete("/{id}")
def delete_session(id: int, db: Session = Depends(get_db)):
    session = db.query(StudySession).filter(StudySession.id == id).first()

    if not session:
        return {"error": "Session not found"}

    db.delete(session)
    db.commit()

    return {"msg": "Deleted"}