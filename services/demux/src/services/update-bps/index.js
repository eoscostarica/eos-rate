const cron = require("node-cron");
const humanToCron = require("human-to-cron");
const massive = require("massive");
const groupBy = require("lodash.groupby");
const uniqBy = require("lodash.uniqby");

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
  // cleos system listproducers -j -l 1000 >> mainnet-producers.json
  const producers = require("./mainnet-producers.json").rows;
  // cleos get table producerjson producerjson producerjson -l 1000 >> mainnet-bpjson.json
  const producersBPJSON = groupBy(require("./mainnet-bpjson.json").rows, "owner");

  // format and cleanup data
  const cleanProducersList = uniqBy(producers, "owner").filter(bp => producersBPJSON[bp.owner]);
  const producersData = cleanProducersList.map(bpData => {
    return {
      owner: bpData.owner,
      system: bpData,
      bpjson: JSON.parse(producersBPJSON[bpData.owner][0].json)
    };
  });
  return producersData;
};

// updates the postgresdb
const updateBlockProducersData = async () => {
  console.log("==== updating block producer info ====");
  const db = await massive(dbConfig);
  const producersData = await getBlockProducersData();

  const saveBP = async bp => {
    console.log(`try save ${bp.owner}`);
    const bpData = {
      owner: bp.owner,
      system: bp.system,
      bpjson: bp.bpjson
    };
    try {
      const result = await db.producers.save(bpData);
      if (!result) {
        const insertResult = await db.producers.insert(bpData);
        if (!insertResult) {
          console.log(`couldnt save or insert ${bp.owner}`);
          return;
        }
      }
      console.log(`succefully saved ${bp.owner}`);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  for (let i = 0; i < producersData.length; i++) {
    const bp = producersData[i];
    await saveBP(bp);
  }

  // TODO : better error handling, report and retry unfulffilled
};

const run = async () => {
  try {
    // schedule the cron job
    cron.schedule(humanToCron("once each minute"), updateBlockProducersData);
    // updateBlockProducersData();
  } catch (err) {
    console.log(err);
  }
};

run();
