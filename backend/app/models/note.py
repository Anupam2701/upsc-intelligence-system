from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    subject = Column(String)
    topic = Column(String)
    type = Column(String)  # concept / revision / mistake
    created_at = Column(DateTime, default=datetime.utcnow)