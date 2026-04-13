from sqlalchemy import Column, Integer, String, Boolean, Date
from app.database import Base

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)

    date = Column(Date)
    subject = Column(String)
    topic = Column(String)

    duration = Column(Integer)
    quality_score = Column(Integer)

    revision = Column(Boolean)

    # 🔥 NEW FIELDS
    start_time = Column(String, nullable=True)
    end_time = Column(String, nullable=True)