#!/bin/bash
echo "Applying hasura migrations"
cd ./hasura
hasura migrate apply
cd ../..

