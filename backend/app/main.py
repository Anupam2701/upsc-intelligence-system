from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router

app = FastAPI()

# 🔥 MUST BE FIRST (before routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(note_router)

@app.get("/")
def root():
    return {"msg": "API running"}