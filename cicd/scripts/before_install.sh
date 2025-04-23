#!/bin/bash
# Stop the application if it's running
if [ -f /var/app/current/pidfile ]; then
  kill $(cat /var/app/current/pidfile) || true
fi
 
# Clean up old deployment
rm -rf /var/app/current/* 