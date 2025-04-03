#!/bin/bash

# Frontend build and deployment
echo "Building frontend..."
cd aeo-saas-frontend
npm install
npm run build

# Copy frontend build to server
echo "Deploying frontend..."
scp -r dist/* user@frontieraeo.com:/var/www/aeo-saas/frontend/

# Backend deployment
echo "Deploying backend..."
cd ..
pm2 deploy ecosystem.config.js production 