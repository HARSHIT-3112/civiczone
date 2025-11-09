# routes_auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import crud, schemas, models, auth

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schemas.UserOut)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = crud.get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(400, "Email already registered")
    user = crud.create_user(db, user_in.email, user_in.password, user_in.name)
    return user

@router.post("/login")
def login(form_data: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, form_data.email)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "is_admin": user.is_admin,  # ✅ include role in response
        "name": user.name,
    }


@router.get("/me", response_model=schemas.UserOut)
def me(token: str, db: Session = Depends(get_db)):
    # For simplicity in demo, expect token string param (frontend sends it)
    from jose import jwt
    from dotenv import load_dotenv
    import os
    load_dotenv()
    secret = os.getenv("JWT_SECRET")
    try:
        payload = jwt.decode(token, secret, algorithms=[os.getenv("JWT_ALGORITHM", "HS256")])
        uid = int(payload.get("sub"))
    except Exception:
        raise HTTPException(401, "Invalid token")
    user = crud.get_user(db, uid)
    if not user:
        raise HTTPException(404, "User not found")
    return user


