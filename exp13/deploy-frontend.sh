#!/bin/bash

set -e

cd frontend
npm install
npm run build
cd ..

sudo cp -r frontend/build/* /usr/share/nginx/html/
sudo cp nginx/nginx.conf /etc/nginx/conf.d/app.conf
sudo nginx -t
sudo systemctl reload nginx
