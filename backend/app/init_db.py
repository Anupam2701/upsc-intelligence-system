from app.database import engine, Base

# 🔥 IMPORT ALL MODELS (VERY IMPORTANT)
from app.models.study_session import StudySession
from app.models.note import Note

# 🔥 CREATE ALL TABLES
Base.metadata.create_all(bind=engine)