from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta

from app.database import SessionLocal
from app.models.todo import Todo
from app.schemas.todo import TodoCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ CREATE
@router.post("/")
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    new = Todo(**todo.dict())
    db.add(new)
    db.commit()
    db.refresh(new)
    return new

# ✅ GET ALL
@router.get("/")
def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()

# ✅ DELETE
@router.delete("/{id}")
def delete_todo(id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == id).first()
    if todo:
        db.delete(todo)
        db.commit()
    return {"msg": "deleted"}

# ✅ TOGGLE
@router.put("/{id}")
def toggle_todo(id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == id).first()
    if todo:
        todo.completed = not todo.completed
        db.commit()
    return {"msg": "updated"}

# 🔥 AUTO SHIFT (IMPORTANT)
@router.post("/rollover")
def rollover(db: Session = Depends(get_db)):
    today = date.today()
    yesterday = today - timedelta(days=1)

    todos = db.query(Todo).filter(
        Todo.date == yesterday,
        Todo.type == "tomorrow"
    ).all()

    for t in todos:
        t.date = today
        t.type = "today"

    db.commit()
    return {"msg": "rolled over"}