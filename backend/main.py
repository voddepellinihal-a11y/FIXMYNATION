from fastapi import FastAPI, Form, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import shutil, os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# UPLOAD FOLDER
if not os.path.exists("uploads"):
    os.makedirs("uploads")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

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
    done_image = Column(String, nullable=True)
    status = Column(String, default="Pending")

Base.metadata.create_all(bind=engine)

# DB DEP
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# LOGIN (FAKE USERS)
@app.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    if email == "user@test.com" and password == "1234":
        return {"access_token": "user-token", "role": "user"}

    if email == "admin@test.com" and password == "admin":
        return {"access_token": "admin-token", "role": "admin"}

    return {"error": "invalid credentials"}

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
    filename = None

    if file:
        filename = file.filename.replace(" ", "_")
        filepath = os.path.join("uploads", filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    comp = Complaint(
        title=title,
        description=description,
        latitude=lat,
        longitude=lng,
        image=filename,
        status="Pending"
    )

    db.add(comp)
    db.commit()

    return {"msg": "saved"}

# GET COMPLAINTS
@app.get("/complaints")
def get_all(db: Session = Depends(get_db)):
    return db.query(Complaint).all()

# UPDATE STATUS
@app.put("/update-status/{id}")
def update_status(id: int, status: str = Form(...), db: Session = Depends(get_db)):
    comp = db.query(Complaint).filter(Complaint.id == id).first()

    if not comp:
        return {"error": "not found"}

    comp.status = status
    db.commit()

    return {"msg": "status updated"}

# UPLOAD / UPDATE DONE IMAGE
@app.post("/upload-done/{id}")
def upload_done(
    id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    comp = db.query(Complaint).filter(Complaint.id == id).first()

    if not comp:
        return {"error": "not found"}

    filename = f"done_{id}_{file.filename}".replace(" ", "_")
    filepath = os.path.join("uploads", filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    comp.done_image = filename  # overwrite allowed
    db.commit()

    return {"msg": "image updated"}