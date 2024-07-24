from app.config.socket import sio


@sio.on("connect")
async def connect(sid, env):
    print("New Client Connected to This id :"+" "+str(sid))


@sio.on("disconnect")
async def disconnect(sid):
    print("Client Disconnected: "+" "+str(sid))


@sio.on("message")
async def message(sid, data):
    print("Client message: ", data)


@sio.on("task_completed")
async def task_completed(_, data):
    await sio.emit('task_status', {'client_id': data['client_id'], 'task_id': data['task_id'], 'status': 'Completed', 'progress': 100.0})
