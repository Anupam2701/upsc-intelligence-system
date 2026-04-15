from sqlalchemy import Column, Integer, String, Boolean, Date
from app.database import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    date = Column(Date)
    type = Column(String)  # "today" or "tomorrow"
    completed = Column(Boolean, default=False)