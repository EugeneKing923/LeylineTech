from sqlalchemy import Column, Integer, String, Float
from app.config.db import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String, unique=True, index=True)
    client_id = Column(String, index=True)
    status = Column(String, index=True, default="Processing")
    progress = Column(Float, default=0.0)
    video_url = Column(String, nullable=True)
