# Demux

The demux service is made up of an event listener and an event handler. When a new rating is sent it will trigger an function that updates the rating on the postgres database .

To Start Demux Listener : `node ./services/demux/src/index.js`

Make sure the database service is also running locally.

You can then execute the `rateproducer::rate` action which will trigger the database update.
