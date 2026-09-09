from fastapi import APIRouter
from database import SessionLocal
from models import User

router = APIRouter()

@router.post("/register")
def register(email: str, password: str):
    db = SessionLocal()
    user = User(email=email, password=password)
    db.add(user)
    db.commit()
    return {"message": "User registered"}