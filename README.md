# LeyLine Backend Technical Challenge

## Overview

Design and implement a web application that allows users to upload an image and receive a generated video based on that image. The system must handle the constraints of limited memory and simulate an artificial intelligence (AI) model that is resource-intensive and has a fixed processing time.

## Requirements

### 1. Image Upload
- Users should be able to upload an image via a web interface.
- The user upload frequency is higher than the model processing speed.
- Users should be able to see the current status of their video generation task. While processing, they should be able to see the percentage progress in real-time.

### 2. Simulated AI Model
- Simulate the workflow of an AI model that processes each image to generate a video.
- The AI model should take 30 seconds to process an image.
- The model can only process one image at a time.
- You may use a sleep function to simulate the processing time.

### 3. Generated Video
- After processing, the system should generate a video based on the uploaded image.
- The video should be viewable on the web interface.
- The video should be read-only; users should not be able to download it.

## Recommended Technologies
- **Frontend**: React / Next.js, Typescript, ...
- **Backend**: Python (FastAPI, Flask, ...)
- **Technology Flexibility**: Feel free to use any technologies not listed above.

## Features

1. **Image Upload**: Users can upload images via a web interface.
2. **Simulated AI Model**: Simulates a resource-intensive AI model with a fixed 30-second processing time.
3. **Generated Video**: Generates a video based on the uploaded image, viewable on the web interface.
4. **Real-time Updates**: Users receive real-time updates on the progress of their video generation tasks via WebSockets.
5. **Lightweight Database**: Uses SQLite for lightweight, self-contained database operations.

## Installation

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Clone the repository**:
    ```sh
    git clone <repository_url>
    cd LeylineTech
    ```

2. **Build and start the Docker containers**:
    ```sh
    docker-compose -f rabbitmq.yml up
    docker-compose up --build
    ```

## Configuration

### Dockerfile

The Dockerfile sets up the application environment, installs necessary dependencies, and runs the FastAPI server using Gunicorn.

### docker-compose.yml

The docker-compose file defines the services for the FastAPI web server, frontend server, RABBITMQ server.

### app/config.py

Defines the database configuration using SQLite.

### app/routes/video.py

Defines the API endpoints for uploading images, checking task status, and streaming the generated video.

### app/routes/socket.py

Handles WebSocket connections and events for real-time updates.

## Running the Application

After running `docker-compose up --build`, the application will be available at `http://localhost:3000`.

### API Endpoints
- **POST /api/video/upload/**: Upload an image and start the video generation process.
- **GET /api/video/{task_id}/status**: Check the status of a video generation task.
- **GET /api/video/{task_id}/video**: Stream the generated video.

### WebSocket Events
- **connect**: Client connects to the WebSocket server.
- **disconnect**: Client disconnects from the WebSocket server.
- **task_status**: Server notifies the client about the current progress of a video generation task.

## Decision and Compromises

### Technology Choice
- **FastAPI**: Chosen for its performance, asynchronous capabilities, and ease of integration with WebSockets and background tasks.
- **Rabbitmq**: Provides robust background task management and reliable messaging.
- **SQLite**: Selected for its simplicity and lightweight nature, suitable for testing and small-scale applications. For a production environment, a more robust database like PostgreSQL or MySQL would be preferable.

### Compromises
- **Database**: Using SQLite instead of a more robust database (e.g., PostgreSQL) is a compromise made for simplicity and ease of testing.
- **Resource Simulation**: The AI model processing is simulated with a sleep function, which is not representative of actual AI model processing but serves the purpose of demonstrating the workflow.

## Conclusion

This project demonstrates a comprehensive solution for handling image uploads, simulating AI processing, generating videos, and providing real-time updates using WebSockets. The technology choices and implementation decisions prioritize simplicity and ease of testing, making the application suitable for demonstration and small-scale use cases. For production environments, further optimizations and enhancements would be necessary.
