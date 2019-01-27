const cron = require("node-cron");
const EosApi = require("eosjs-api");
const humanToCron = require("human-to-cron");
const massive = require("massive");
const get = require("lodash.get");

const dbConfig = {
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "pass",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "eosrate",
  schema: process.env.DB_SCHEMA || "public"
};

// gets data from mainnet
const getBlockProducersData = async () => {
  const eos = EosApi({
    httpEndpoint: process.env.EOS_API_ENDPOINT,
    verbose: false
  });
  const { rows: producers } = await eos.getProducers({ json: true, limit: 1000 });
  const { rows: bpJsons } = await eos.getTableRows({
    json: true,
    code: "producerjson",
    scope: "producerjson",
    table: "producerjson",
    limit: 1000
  });

  const allProducers = producers.reduce(
    (result, producer) => [
      ...result,
      {
        owner: producer.owner,
        system: { ...producer },
        bpJson: get(bpJsons.find(bpJson => bpJson.owner === producer.owner), "json", {})
      }
    ],
    []
  );

  const requests = allProducers
    .filter(({ bpJson, system }) => !Object.keys(bpJson) && system.url)
    .map(({ system: { url } }) => {
      let result = url;
      if (!url.startsWith("http")) {
        result = `http://${url}`;
      }
      if (!url.endsWith(".json")) {
        result = `${result}/bp.json`;
      }
      return result;
    })
    .map(url =>
      fetch(url)
        .then(res => res.json())
        .catch(e => {
          console.error(e);
        })
    );

  const allJsons = await Promise.all(requests);
  const result = allProducers.map(producer => ({
    ...producer,
    bpJson: Object.keys(producer.bpJson).length
      ? producer.bpJson
      : allJsons.find(bpJson => bpJson && bpJson.producer_account_name === producer.owner) || {}
  }));

  return result;
};

// updates the postgresdb
const updateBlockProducersData = async () => {
  console.log("==== updating block producer info ====");
  const db = await massive(dbConfig);
  const producersData = await getBlockProducersData();

  const saveBP = async ({ owner, system, bpJson: bpjson }) => {
    console.log(`try saving ${owner}`);
    const bpData = {
      owner,
      system,
      bpjson
    };

    try {
      const result = await db.producers.save(bpData);
      if (!result) {
        const insertResult = await db.producers.insert(bpData);
        if (!insertResult) {
          console.log(`couldnt save or insert ${owner}`);
          return;
        }
      }
      console.log(`succefully saved ${bp.owner}`);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  for (let bp of producersData) {
    await saveBP(bp);
  }

  // TODO : better error handling, report and retry unfulffilled
};

const run = async () => {
  try {
    // schedule the cron job
    cron.schedule(humanToCron("once each day"), updateBlockProducersData);
    updateBlockProducersData();
  } catch (err) {
    console.error(err);
  }
};

run();
