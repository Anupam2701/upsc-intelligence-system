from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router
from app.database import Base, engine
from app.models.note import Note

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(note_router)


@app.get("/")
def root():
    return {"msg": "API running"}