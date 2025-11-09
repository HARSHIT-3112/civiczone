# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
import models
from routes_auth import router as auth_router
from routes_reports import router as reports_router

# create DB
Base.metadata.create_all(bind=engine)
from sqlalchemy.orm import Session
import crud, auth

# Create default admin if not present
with Session(engine) as db:
    admin = crud.get_user_by_email(db, "admin@civiczone.in")
    if not admin:
        crud.create_user(db, "admin@civiczone.in", "admin123", "Admin")
        admin = crud.get_user_by_email(db, "admin@civiczone.in")
        admin.is_admin = True
        db.commit()
        print("✅ Default admin created: admin@civiczone.in / admin123")


app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

app.include_router(auth_router)
app.include_router(reports_router)
