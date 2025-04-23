#!/bin/bash
# Install dependencies
cd /var/app/current
npm install --production

# Set up environment variables
echo "NODE_ENV=production" > .env
echo "DB_HOST=${DB_HOST}" >> .env
echo "DB_NAME=${DB_NAME}" >> .env
echo "DB_USER=${DB_USER}" >> .env
echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
echo "JWT_SECRET=${JWT_SECRET}" >> .env
echo "TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}" >> .env
echo "TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}" >> .env
echo "TWILIO_PHONE_NUMBER=${TWILIO_PHONE_NUMBER}" >> .env
echo "AWS_REGION=${AWS_REGION}" >> .env
echo "SNS_TOPIC_ARN=${SNS_TOPIC_ARN}" >> .env

# Set proper permissions
chown -R nodejs:nodejs /var/app/current 