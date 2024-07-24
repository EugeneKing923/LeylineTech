from pydantic import BaseModel
from typing import Optional


class TaskBase(BaseModel):
    task_id: str
    status: str
    progress: float
    client_id: str


class TaskCreate(TaskBase):
    pass


class TaskResponse(TaskBase):
    video_url: Optional[str] = None
