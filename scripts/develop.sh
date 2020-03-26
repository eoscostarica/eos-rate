#!/bin/bash
echo "Starting local development environment..."
docker-compose up -d --build postgres hasura hapi

# wait 10s for the docker services to start
sleep 10s

# start the reactjs client
cd services/frontend
yarn
yarn start

cd ../..
