from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    subject = Column(String, index=True)
    topic = Column(String, index=True)

    # 🔥 NEW FIELDS
    reference = Column(String, index=True)
    subtopic = Column(String, index=True)

    title = Column(String)
    content = Column(Text)

    type = Column(String, default="concept")

    created_at = Column(DateTime, default=datetime.utcnow)