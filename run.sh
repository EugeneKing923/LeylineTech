#!/bin/bash
# Run frontend
cd app
npm run build
npm run start &

# Run backend
cd ../backend
docker-compose up --build
