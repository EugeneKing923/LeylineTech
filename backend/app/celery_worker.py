import socketio
import os
from celery import Celery
import ffmpeg
import asyncio
from contextlib import asynccontextmanager

sio = socketio.AsyncClient()

app = Celery('tasks', broker='redis://redis:6379/0', backend='redis://redis:6379/0')


@asynccontextmanager
async def socket_connection():
    try:
        print("Connecting to socket server...")
        await sio.connect('http://web:8000')
        print("Connected to socket server.")
        yield
    except Exception as e:
        print("Connection error:", e)
    finally:
        print("Disconnecting from socket server...")
        await sio.disconnect()
        print("Disconnected from socket server.")


async def emit_task_completed(task_id, client_id):
    try:
        print(f"Emitting task_completed event for task_id: {task_id}, client_id: {client_id}")
        await sio.emit("task_completed", {'task_id': task_id, 'client_id': client_id})
        await asyncio.sleep(5)  # Keep connection open for 5 seconds for demonstration
        print("Event emitted successfully.")
    except Exception as e:
        print('Error emitting event:', e)

@app.task
def process_image(task_id, client_id):
    input_image = f'storage/{task_id}.png'
    output_video = f'videos/{task_id}.mp4'

    # Check if the input image exists
    if not os.path.exists(input_image):
        raise FileNotFoundError(f"Input image {input_image} does not exist")

    ffmpeg.input(input_image, loop=1, t=5).output(output_video).run()

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(task_id, client_id))


async def main(task_id, client_id):
    async with socket_connection():
        await emit_task_completed(task_id, client_id)
