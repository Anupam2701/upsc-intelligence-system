from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.study_session import StudySession
from app.schemas.study_session import StudySessionCreate

router = APIRouter(prefix="/sessions")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ POST (CREATE)
@router.post("/")
def create_session(session: StudySessionCreate, db: Session = Depends(get_db)):
    db_session = StudySession(**session.dict())
    db.add(db_session)
    db.commit()
    return {"msg": "Session added"}

# ✅ GET (ALL SESSIONS)
@router.get("/")
def get_sessions(db: Session = Depends(get_db)):
    return db.query(StudySession).all()

# ✅ ANALYTICS
@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    sessions = db.query(StudySession).all()

    total = sum(s.duration for s in sessions)

    subject_data = {}
    for s in sessions:
        subject_data[s.subject] = subject_data.get(s.subject, 0) + s.duration

    return {
        "total_hours": total,
        "subject_wise": subject_data
    }