import asyncio
from app.config.socket import sio


@sio.on("connect")
async def connect(sid, env):
    print("New Client Connected to This id :"+" "+str(sid))

@sio.on("disconnect")
async def disconnect(sid):
    print("Client Disconnected: "+" "+str(sid))

@sio.on("task_status")
async def task_status(_, data):
    await sio.emit('task_status', {'task_id': data['task_id'], 'progress': data['progress']})

