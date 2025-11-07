# routes_reports.py
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from database import SessionLocal
from sqlalchemy.orm import Session
import crud, schemas, os
from utils.email_sender import send_email
from PIL import Image
import torch

router = APIRouter(prefix="/reports", tags=["reports"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_report(
    token: str = Form(...),
    file: UploadFile = File(...),
    lat: float = Form(...),
    lon: float = Form(...),
    db: Session = Depends(get_db)
):
    # decode token to user_id
    from jose import jwt
    secret = os.getenv("JWT_SECRET")
    try:
        payload = jwt.decode(token, secret, algorithms=[os.getenv("JWT_ALGORITHM","HS256")])
        user_id = int(payload.get("sub"))
    except Exception:
        raise HTTPException(401, "Invalid token")
    # read image for dummy classification
    image = Image.open(file.file).convert("RGB")
    # dummy label - replace with real model later
    labels = ["pothole", "garbage", "pollution", "streetlight", "water leakage"]
    detected = labels[torch.randint(0, len(labels), (1,)).item()]
    description = f"A {detected} has been detected near {lat:.4f}, {lon:.4f}."
    email_ok = send_email(detected, description, lat, lon)
    report = crud.create_report(db, user_id=user_id, issue_type=detected, description=description, lat=lat, lon=lon, email_sent=email_ok)
    return {"report": report, "email_sent": email_ok}

@router.get("/")
def list_reports(token: str = None, db: Session = Depends(get_db)):
    # if token provided, return user's reports, else all reports
    if token:
        from jose import jwt
        try:
            payload = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=[os.getenv("JWT_ALGORITHM","HS256")])
            user_id = int(payload.get("sub"))
            return crud.get_reports_for_user(db, user_id)
        except Exception:
            raise HTTPException(401, "Invalid token")
    return crud.get_reports(db)
