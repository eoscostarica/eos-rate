#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Usage: deploy.sh <namespace> <external_ip>"
    exit 0
fi

kubectl create -f kubernetes/ --namespace=$1
kubectl expose deployment frontend --namespace=$1 --name=frontend-port-http --port=80 --target-port=80 --type=ClusterIP --external-ip=$2
kubectl expose deployment frontend --namespace=$1 --name=frontend-port-https --port=443 --target-port=443 --type=ClusterIP --external-ip=$2
kubectl expose deployment hasura --namespace=$1 --name=hasura-port --port=8088 --target-port=8080 --type=ClusterIP --external-ip=$2
