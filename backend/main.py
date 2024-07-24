from app.config.app import app
from app.config.db import engine, Base
from app.config.socket import *
from app.routes import video, socket

Base.metadata.create_all(bind=engine)

# app.include_router(video.router, prefix="/api/video")
