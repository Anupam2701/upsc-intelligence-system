from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router
from app.routes.session_routes import router as session_router
from app.routes import todo_routes
from app.routes import ai
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()
# ✅ CORS FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTES (CRITICAL FIX HERE)
app.include_router(note_router, prefix="/notes")
app.include_router(session_router, prefix="/sessions")
app.include_router(todo_routes.router, prefix="/todos", tags=["Todos"])
app.include_router(ai.router)
@app.get("/")
def root():
    return {"msg": "API running"}