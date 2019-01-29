#!/bin/bash
echo "Starting docker containers"
docker-compose up -d --build postgres demux hasura

# wait 10s for the docker services to start
sleep 10s

# run hasura postgres migrations
source $(dirname $0)/migrate.sh

# start the reactjs client
cd services/frontend
yarn
yarn start

cd ../..
