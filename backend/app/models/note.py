from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    subject = Column(String)
    topic = Column(String)
    reference = Column(String)
    subtopic = Column(String)

    title = Column(String)
    content = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)