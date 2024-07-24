import pika, os, time, json

params = pika.URLParameters('amqp://leyline:leyline@localhost:5672/%2f')
connection = pika.BlockingConnection(params)
channel = connection.channel() # start a channel
channel.queue_declare(queue='inference') # Declare a queue
channel.queue_declare(queue='progress') # Declare a queue

def process_function(msg):
  msg = msg.decode('utf-8')
  print(" [x] Processing " + msg)

  ######## WE CAN ADD AI LOGIC HERE!!!!!!!!!!!!!!!
  for i in range(30) :
    channel.basic_publish(exchange='',
        routing_key='progress',
        body=json.dumps({'id': msg, 'progress': round((i + 1) / 30 * 100)}),
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    time.sleep(1) # delays for 5 seconds
    
  print("Finished " + msg)
  return

# create a function which is called on incoming messages
def callback(ch, method, properties, body):
  process_function(body)

# set up subscription on the queue
channel.basic_consume('inference', callback, auto_ack=True)

# start consuming (blocks)
channel.start_consuming()
connection.close()