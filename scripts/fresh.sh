#!/bin/bash
echo "Seeding Database and Syncing with Blockchain Tables"
cd ../services/hapi/src/libs/
node sync-bps.js
node sync-proxies.js
node sync-ratings.js
node sync-stats.js
node add-bps-info.js
cd ../../../../