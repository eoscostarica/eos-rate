#!/bin/bash

DIR="/home/appeoscr/eos-rate/services/update-bps"

while true; do
  /usr/bin/node $DIR/update-ratings.js & echo $! > $DIR/update.pid
  sleep 10;
done
