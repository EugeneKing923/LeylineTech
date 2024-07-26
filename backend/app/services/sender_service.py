# # from celery import Celery
# # import asyncio
# import socketio

# class TaskService:
#     @staticmethod
#     async def send_notification(client_id: str, task_id: str):
#         sio = socketio.AsyncClient()
#         await sio.connect('http://web:8000')
#         await sio.emit('task_completed', {'client_id': client_id, 'task_id': task_id})
#         await sio.disconnect()

#     @staticmethod
#     def process_image(task_id: str, client_id: str):
#         from app.celery_worker import process_image
#         process_image.delay(task_id, client_id)

import pika, sys, os, json
from threading import Thread

def sendTask(id) :
    params = pika.URLParameters('amqp://leyline:leyline@localhost:5672/%2f')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue='inference')
    channel.basic_publish(exchange='',
        routing_key='inference',
        body=id,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    connection.close()
    
