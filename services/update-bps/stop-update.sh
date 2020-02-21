#!/bin/bash

DIR="/home/appeoscr/eos-rate/services/update-bps"

if [ -f "/update.pid" ]; then
	pid=`cat $DIR"/update.pid"`
	echo $pid
	kill $pid
	rm -r $DIR"/update.pid"

	echo -ne "Stoping Updates"

        while true; do
            [ ! -d "/proc/$pid/fd" ] && break
            echo -ne "."
            sleep 1
        done
        echo -ne "\Updates Stopped.    \n"
fi
