#!/bin/bash
# Stop the application
if [ -f /var/app/current/pidfile ]; then
  kill $(cat /var/app/current/pidfile) || true
  rm /var/app/current/pidfile
fi 