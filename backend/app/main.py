from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router
from app.routes.session_routes import router as session_router
from app.routes import todo_routes

app = FastAPI()

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

@app.get("/")
def root():
    return {"msg": "API running"}