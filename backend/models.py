from sqlalchemy import Column, Integer, String, Text, Float
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    image = Column(String)
    status = Column(String, default="Submitted")
    done_image = Column(String, nullable=True)