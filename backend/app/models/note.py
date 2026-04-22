from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    exam = Column(String, default="UPSC CSE")  # 🔥 NEW

    subject = Column(String)
    topic = Column(String)
    reference = Column(String)
    subtopic = Column(String)

    title = Column(String)
    content = Column(Text)

    type = Column(String, default="concept")

    created_at = Column(DateTime, default=datetime.utcnow)