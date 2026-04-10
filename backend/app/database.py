from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# 🔥 Use Render DB if available, else fallback to SQLite (local)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Fix for postgres (Render requires this)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()