import socketio
import pika, sys, os, json
from threading import Thread

def consume_func() :
    sio = socketio.Client()
    sio.connect('http://localhost:8000')

    params = pika.URLParameters('amqp://leyline:leyline@localhost:5672/%2f')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.queue_declare(queue='inference')
    channel.queue_declare(queue='progress')

    def process_function(msg):
        msg = json.loads(msg.decode('utf-8'))
        print(" [x] Received ")
        print (msg)
        sio.emit('task_status', {'task_id': msg['id'], 'progress': msg['progress']})
        
    # create a function which is called on incoming messages
    def callback(ch, method, properties, body):
        process_function(body)

    # set up subscription on the queue
    channel.basic_consume('progress',
        callback,
        auto_ack=True)
    channel.start_consuming()

th = Thread(target=consume_func)
th.start()