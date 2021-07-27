#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Usage: build.sh <environment>"
    exit 0
fi

echo "Building docker containers..."
if [ "$1" == "production" ]; then
    docker build -t eoscostarica506/demux demux/
    docker push eoscostarica506/demux
    docker build -t eoscostarica506/hapi hapi/
    docker push eoscostarica506/hapi
    docker build -t eoscostarica506/webapp:latest --build-arg branch="production" --target server webapp/
    docker push eoscostarica506/webapp:latest
elif [ "$1" == "testing" ]; then
    docker build -t eoscostarica506/webapp:staging --build-arg branch="staging" --target server webapp/
    docker push eoscostarica506/webapp:staging
fi
