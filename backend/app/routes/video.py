import os

from fastapi import UploadFile, File, HTTPException, Form
from fastapi.responses import StreamingResponse

from uuid import uuid4
import aiofiles

from app.config.db import SessionLocal
from app.db.models import Task
from app.db.schema import TaskResponse

from app.celery_worker import process_image


from app.config.app import app as router


@router.post("/upload/", response_model=TaskResponse)
async def upload_image(file: UploadFile = File(...), client_id: str = Form(...)):
    task_id = str(uuid4())

    async with aiofiles.open(f"storage/{task_id}.png", 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
        process_image.delay(task_id, client_id)

    db = SessionLocal()
    task = Task(task_id=task_id, client_id=client_id)
    db.add(task)
    db.commit()

    db.refresh(task)

    return task


@router.get("/{task_id}/status", response_model=TaskResponse)
def get_status(task_id: str):
    db = SessionLocal()
    task = db.query(Task).filter(Task.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.get("/{task_id}/video")
async def get_video(task_id: str):
    video_path = f"videos/{task_id}.mp4"
    print(f"Request received for video path: {video_path}")

    if not os.path.exists(video_path):
        raise HTTPException(status_code=404, detail=f"Video {video_path} does not exist")

    async def video_stream():
        async with aiofiles.open(video_path, 'rb') as f:
            while chunk := await f.read(1024 * 1024):
                yield chunk

    print(f"Video found. Serving video from path: {video_path}")
    return StreamingResponse(video_stream(), media_type="video/mp4")