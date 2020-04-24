#!/bin/bash
echo "Starting docker containers"
docker-compose up -d --build postgres hasura hapi frontend
