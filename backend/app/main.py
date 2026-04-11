from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router
from app.routes.session_routes import router as session_router

app = FastAPI()

# ✅ CORS (MUST BE BEFORE ROUTES)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTES
app.include_router(note_router)
app.include_router(session_router, prefix="/sessions")

@app.get("/")
def root():
    return {"msg": "API running"}