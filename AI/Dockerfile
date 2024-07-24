FROM python:3.9-slim

WORKDIR /app

# Copy the requirements file and install dependencies
RUN pip install pika gunicorn uvicorn

# Copy the application code
COPY . .

# Expose the port
EXPOSE 8001

# Command to run the application using gunicorn
CMD ["gunicorn", "main:.", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8001"]
