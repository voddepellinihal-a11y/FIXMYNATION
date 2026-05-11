from fastapi import FastAPI, Form, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import shutil
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# UPLOADS
if not os.path.exists("uploads"):
    os.makedirs("uploads")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# DATABASE
DATABASE_URL = "sqlite:///./database.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# MODEL
class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    image = Column(String)
    done_image = Column(String, nullable=True)
    status = Column(String, default="Pending")

# CREATE TABLE
Base.metadata.create_all(bind=engine)

# DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# LOGIN
@app.post("/login")
def login(
    email: str = Form(...),
    password: str = Form(...)
):
    # USER
    if email == "user@gmail.com" and password == "1234":
        return {
            "access_token": "user-token",
            "role": "user"
        }

    # ADMIN
    if email == "admin@gmail.com" and password == "admin123":
        return {
            "access_token": "admin-token",
            "role": "admin"
        }

    return {
        "error": "Invalid credentials"
    }

# CREATE COMPLAINT
@app.post("/complaint")
def create_complaint(
    title: str = Form(...),
    description: str = Form(...),
    lat: float = Form(...),
    lng: float = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    filename = ""

    if file:
        filename = file.filename.replace(" ", "_")

        with open(f"uploads/{filename}", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    complaint = Complaint(
        title=title,
        description=description,
        latitude=lat,
        longitude=lng,
        image=filename,
        status="Pending"
    )

    db.add(complaint)
    db.commit()

    return {"message": "Complaint submitted"}

# GET ALL
@app.get("/complaints")
def get_complaints(db: Session = Depends(get_db)):
    return db.query(Complaint).all()

# UPDATE STATUS
@app.put("/update-status/{id}")
def update_status(
    id: int,
    status: str = Form(...),
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(Complaint.id == id).first()

    if complaint:
        complaint.status = status
        db.commit()

    return {"message": "Status updated"}

# UPLOAD DONE IMAGE
@app.post("/upload-done/{id}")
def upload_done(
    id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(Complaint.id == id).first()

    if complaint:
        filename = f"done_{file.filename}".replace(" ", "_")

        with open(f"uploads/{filename}", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        complaint.done_image = filename
        db.commit()

    return {"message": "Done image uploaded"}