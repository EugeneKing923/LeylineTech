import socketio
from app.config.app import app

sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')

app = socketio.ASGIApp(
    socketio_server=sio,
    other_asgi_app=app,
    socketio_path='/socket.io/'
)