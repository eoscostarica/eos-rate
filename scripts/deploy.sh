#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Usage: deploy.sh <namespace> <external_ip>"
    exit 0
fi

if [ "$1" == "production" ]; then
    kubectl create -f kubernetes/common/ --namespace="$1"
    kubectl create -f kubernetes/production/ --namespace="$1"
    kubectl expose deployment frontend --namespace="$1"\
    --name=frontend-port-http --port=80 --target-port=80 --type=ClusterIP --external-ip="$2"
    kubectl expose deployment frontend --namespace="$1"\
    --name=frontend-port-https --port=443 --target-port=443 --type=ClusterIP --external-ip="$2"
elif [ "$1" == "testing" ]; then
    kubectl create -f kubernetes/common/ --namespace="$1"
    kubectl create -f kubernetes/testing/ --namespace="$1"
    kubectl expose deployment frontend --namespace="$1"\
    --name=frontend-port-http --port=8080 --target-port=8080 --type=ClusterIP --external-ip="$2"
fi
