#!/bin/bash
echo "Starting demux service ..."
# use pm2-dev to start the app with live reload
pm2 start ecosystem.config.js --watch
