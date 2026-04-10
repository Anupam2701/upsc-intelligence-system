from fastapi import FastAPI
from app.routes.session_routes import router as session_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes import note_routes

app = FastAPI()


app.include_router(note_routes.router)

app.include_router(session_router, prefix="/sessions")

@app.get("/")
def root():
    return {"message": "UPSC Tracker Running"}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/favicon.ico")
def favicon():
    return {}