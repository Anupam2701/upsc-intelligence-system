from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router
from app.database import Base, engine

# 🔥 IMPORTANT: import ALL models
from app.models.note import Note
from app.models.study_session import StudySession

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 Creates ALL tables
Base.metadata.create_all(bind=engine)

app.include_router(note_router)

@app.get("/")
def root():
    return {"message": "UPSC API running 🚀"}

@app.get("/favicon.ico")
def favicon():
    return {}