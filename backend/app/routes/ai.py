from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.study_session import StudySession
from app.services.ai_service import generate_plan

router = APIRouter(prefix="/ai", tags=["AI"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/plan")
def ai_plan(db: Session = Depends(get_db)):
    sessions = db.query(StudySession).all()
    plan = generate_plan(sessions)

    return {"plan": plan}