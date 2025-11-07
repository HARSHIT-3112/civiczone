# crud.py
from sqlalchemy.orm import Session
import models, auth

def create_user(db: Session, email: str, password: str, name: str = None):
    hashed = auth.get_password_hash(password)
    user = models.User(email=email, name=name, hashed_password=hashed)
    db.add(user); db.commit(); db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_report(db: Session, user_id: int, issue_type: str, description: str, lat: float, lon: float, email_sent: bool):
    r = models.Report(user_id=user_id, issue_type=issue_type, description=description, lat=lat, lon=lon, email_sent=email_sent)
    db.add(r); db.commit(); db.refresh(r)
    return r

def get_reports_for_user(db: Session, user_id: int):
    return db.query(models.Report).filter(models.Report.user_id == user_id).order_by(models.Report.created_at.desc()).all()

def get_reports(db: Session):
    return db.query(models.Report).order_by(models.Report.created_at.desc()).all()
