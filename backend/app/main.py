from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.note_routes import router as note_router

app = FastAPI()

# 🔥 VERY IMPORTANT (PUT BEFORE ROUTES)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(note_router)


@app.get("/")
def root():
    return {"msg": "API running"}