#!/bin/bash
echo "Building docker containers..."
docker build -t eoscostarica506/demux services/demux/
docker push eoscostarica506/demux
docker build -t eoscostarica506/hapi services/hapi/
docker push eoscostarica506/hapi
docker build -t eoscostarica506/frontend --target server services/frontend/
docker push eoscostarica506/frontend
