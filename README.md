# Project Setup

This project includes both a backend and a frontend. The backend is managed using Docker Compose, while the frontend is built and started using npm.

## Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose
- Node.js and npm

## Setup and Run

To run both the backend and frontend concurrently, follow these steps:

1. **Backend Setup and Start**

   Navigate to the backend directory and start the backend services using Docker Compose:

   ```bash
   cd backend
   docker-compose up --build
   ```

2. **Frontend Setup and Start**

    Open a new terminal window/tab, navigate to the frontend directory, and build and start the frontend:
    ```bash
    cd app
    npm run build
    npm run start
   ```

3. **To run both together**
   From the root of the project run: 
  
4. ```bash
    sh run.sh
   ```