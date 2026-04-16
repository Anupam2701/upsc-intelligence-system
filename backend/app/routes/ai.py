from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.study_session import StudySession

# 🔥 IMPORT AI FUNCTIONS
from app.services.ai_service import generate_plan, chat_ai, generate_strategy

router = APIRouter(prefix="/ai", tags=["AI"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= PLAN =================
@router.get("/plan")
def ai_plan(db: Session = Depends(get_db)):
    sessions = db.query(StudySession).all()
    plan = generate_plan(sessions)

    return {"plan": plan}


# ================= CHAT =================
@router.post("/chat")
def chat(data: dict):
    question = data.get("question")
    answer = chat_ai(question)

    return {"answer": answer}


# ================= STRATEGY =================
@router.get("/strategy")
def strategy(db: Session = Depends(get_db)):
    sessions = db.query(StudySession).all()
    strategy = generate_strategy(sessions)

    return {"strategy": strategy}