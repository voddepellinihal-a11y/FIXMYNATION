from fastapi import FastAPI, Form, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
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

# DATABASE
engine = create_engine("sqlite:///./database.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# MODEL
class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    image = Column(String)

Base.metadata.create_all(bind=engine)

# DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE UPLOAD FOLDER
if not os.path.exists("uploads"):
    os.makedirs("uploads")

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
    print("RECEIVED:", title, description, lat, lng)

    filename = None

    if file:
        filepath = f"uploads/{file.filename}"
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        filename = filepath

    complaint = Complaint(
        title=title,
        description=description,
        latitude=lat,
        longitude=lng,
        image=filename
    )

    db.add(complaint)
    db.commit()

    return {"msg": "saved"}

# GET
@app.get("/complaints")
def get_all(db: Session = Depends(get_db)):
    return db.query(Complaint).all()