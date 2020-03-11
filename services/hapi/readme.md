# EOS RATE HAPI

## A backend service for synchronizing EOS RATE blockchain tables with POSTGRESQL.

### How to run

---

- Run docker container `dc up hapi`
- Visit `http://localhost:3005/ratebp?producer=<bp>&user=<user>`
- Replace `<bp>&user=<user>` for block producer and user account rating , this will trigger updating tables with those values.

### HTTP Triggers

---

- **Sync Stats Table for a Specific Block Producer**

`src/libs/sync-bp-stats.js`

This is called by the `/ratebp` hapi endpoint.

- **Sync Ratings Table for a Specific User**

`src/libs/sync-user-ratings.js`

This is called by the `/ratebp` hapi endpoint.

### Cron Jobs

---

**Sync Stats Table for All Block Producers**

`src/libs/sync-bps.js`

This is executed by a **CRON JOB** to syncronize registered block producers with eos-rate.

### Database seeds

---

**Sync Stats Table for All Block Producers**

`src/libs/sync-stats.js`

This script is used manually if tables need to be populated from scratch.

**Sync Ratings Table for All Users**

`src/libs/sync-ratings.js`

This script is used manually if tables need to be populated from scratch.

#### **Block Producer Additional info** `src/libs/add-bps-info.js`

This script seeds the database with additional info. Such as the "from their website" texts.
