from dotenv import load_dotenv
load_dotenv()

from app.config.app import app
from app.config.db import engine, Base
from app.config.socket import *
from app.routes import video, socket
from app.services.receiver_service import *
from app.services.sender_service import *

Base.metadata.create_all(bind=engine)
# app.include_router(video.router, prefix="/api/video")
