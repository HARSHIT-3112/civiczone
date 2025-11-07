# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: Optional[str]
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ReportCreate(BaseModel):
    issue_type: str
    description: str
    lat: float
    lon: float

class ReportOut(BaseModel):
    id: int
    user_id: int
    issue_type: str
    description: str
    lat: float
    lon: float
    email_sent: bool
    created_at: datetime
    class Config:
        orm_mode = True
