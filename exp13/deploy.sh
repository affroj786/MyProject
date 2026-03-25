#!/bin/bash

set -e

echo "=== Building React Frontend ==="
cd frontend
npm install
npm run build
cd ..

echo "=== Packaging Spring Boot Backend ==="
cd backend
mvn clean package -DskipTests
cd ..

echo "=== Deploying Frontend to Nginx ==="
sudo cp -r frontend/build/* /usr/share/nginx/html/
sudo cp nginx/nginx.conf /etc/nginx/conf.d/app.conf
sudo nginx -t
sudo systemctl reload nginx

echo "=== Installing Backend Service ==="
sudo mkdir -p /opt/fullstack-app
sudo cp backend/target/fullstack-app.jar /opt/fullstack-app/
sudo cp backend/.env.example /opt/fullstack-app/.env
sudo cp fullstack-app.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable fullstack-app
sudo systemctl restart fullstack-app

echo "=== Deployment Complete ==="
echo "Frontend : http://localhost:80"
echo "Backend  : http://localhost:8080/api/health"
