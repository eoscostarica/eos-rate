#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Usage: build.sh <environment>"
    exit 0
fi

echo "Building docker containers..."
if [ "$1" == "production" ]; then
    docker build -t eoscostarica506/demux services/demux/
    docker push eoscostarica506/demux
    docker build -t eoscostarica506/hapi services/hapi/
    docker push eoscostarica506/hapi
    docker build -t eoscostarica506/frontend:latest --build-arg branch="production" --target server services/frontend/
    docker push eoscostarica506/frontend:latest
elif [ "$1" == "testing" ]; then
    docker build -t eoscostarica506/frontend:staging --build-arg branch="staging" --target server services/frontend/
    docker push eoscostarica506/frontend:staging
fi
