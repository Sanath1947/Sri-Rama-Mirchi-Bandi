#!/bin/bash
# Start the application
cd /var/app/current
npm start &

# Save the process ID
echo $! > pidfile 