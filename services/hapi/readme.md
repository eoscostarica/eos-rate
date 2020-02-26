#EOS RATE HAPI

## A backend service for synchronizing EOS RATE blockchain tables with POSTGRESQL.

### How to run

1- Run docker container `dc up hapi`
2- Visit `http://localhost:3005/ratebp?producer=<bp>&user=<user>`
3- Replace `<bp>&user=<user>` for block producer and user account rating , this will trigger updating tables with those values.

### Sync Scripts

#### Sync Stats Table for a Specific Block Producer

`src/libs/sync-bp-stats.js`

This is called by the `/ratebp` hapi endpoint.

#### Sync Stats Table for All Block Producers

`src/libs/sync-bps.js`

#### Sync Stats Table for a Specific User

`src/libs/sync-ratings.js`

This is called by the `/ratebp` hapi endpoint.

#### Sync Stats Table for All Specific User

`src/libs/sync-user-ratings.js`

#### Block Producer Additional info

`src/libs/add-bps-info.js`

This script seeds the database with additional info. Such as the "from their website" texts.
