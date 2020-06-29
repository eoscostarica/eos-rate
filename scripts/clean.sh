#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Usage: clean.sh <environment>"
    exit 0
fi

kubectl delete --namespace ${1} deployment demux hapi \
                 hasura pgweb postgres frontend
kubectl delete --namespace ${1} svc demux hapi hasura \
                 pgweb postgres frontend frontend-port-http \
                 frontend-port-https hasura-port
kubectl delete --namespace ${1} networkpolicy default
kubectl delete cronjob hapi-cronjob --namespace ${1}
