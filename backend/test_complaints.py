import pytest
from fastapi.testclient import TestClient
from main import app
from database import engine, SessionLocal
from models import Base, Complaint

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_create_complaint():
    response = client.post(
        "/complaint",
        data={
            "title": "Test Pothole",
            "description": "Large pothole on Main Street",
            "lat": 12.9716,
            "lng": 77.5946,
        },
    )
    assert response.status_code == 200
    assert response.json() == {"msg": "saved"}

def test_get_complaints():
    response = client.get("/complaints")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert data[0]["title"] == "Test Pothole"
    assert data[0]["description"] == "Large pothole on Main Street"

def test_complaint_model():
    db = SessionLocal()
    complaint = Complaint(
        title="Model Test",
        description="Testing model creation",
        latitude=13.0,
        longitude=77.0,
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    assert complaint.id is not None
    assert complaint.title == "Model Test"
    assert complaint.latitude == 13.0
    assert complaint.longitude == 77.0
    db.close()