from fastapi import APIRouter
from database import SessionLocal
from models import Complaint

router = APIRouter()

def categorize(text):
    if "road" in text:
        return "Transport"
    elif "garbage" in text:
        return "Sanitation"
    return "Other"

@router.post("/complaint")
def create_complaint(title: str, description: str):
    db = SessionLocal()

    category = categorize(description)

    complaint = Complaint(
        title=title,
        description=description,
        category=category
    )

    db.add(complaint)
    db.commit()

    return {"message": "Complaint submitted"}

@router.get("/complaints")
def get_complaints():
    db = SessionLocal()
    return db.query(Complaint).all()