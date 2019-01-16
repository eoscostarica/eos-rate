#!/bin/bash
echo "Applying hasura migrations"
cd ./services/hasura
hasura migrate apply
cd ../..

