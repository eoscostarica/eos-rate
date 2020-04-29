#!/bin/bash

kubectl create -f kubernetes/
kubectl expose deployment frontend --name=frontend-port-http --port=80 --target-port=80 --type=ClusterIP --external-ip=$1
kubectl expose deployment frontend --name=frontend-port-https --port=443 --target-port=443 --type=ClusterIP --external-ip=$1
kubectl expose deployment hasura --name=hasura-port --port=8088 --target-port=8080 --type=ClusterIP --external-ip=$1
