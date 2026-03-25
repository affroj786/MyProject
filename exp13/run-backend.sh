#!/bin/bash

set -e

cd backend
mvn clean package -DskipTests
cd ..

export SERVER_PORT=8080
export CORS_ORIGINS=http://localhost:80

java -jar backend/target/fullstack-app.jar \
  --server.port=${SERVER_PORT} \
  --app.cors.allowed-origins=${CORS_ORIGINS}
