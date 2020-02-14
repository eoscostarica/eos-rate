#!/usr/bin/env node
const EosApi = require("eosjs-api");
const massive = require("massive");
const get = require("lodash.get");
const fetch = require("node-fetch");

const dbConfig = require("./dbConfig");

// gets data from mainnet
const getBlockProducersData = async () => {
  const eos = EosApi({
    httpEndpoint: process.env.EOS_API_ENDPOINT || "https://jungle.eosio.cr",
    verbose: false
  });
  const { rows: producers } = await eos.getProducers({ json: true });

  const allProducers = producers.reduce((result, producer) => {
    if (!producer.is_active || !parseInt(producer.total_votes)) return result;

    return [
      ...result,
      {
        owner: producer.owner,
        system: { ...producer },
        bpJson: {}
      }
    ];
  }, []);

  const requests = allProducers
    .filter(({ bpJson, system }) => !Object.keys(bpJson).length && system.url)
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
    bpJson: allJsons.find(bpJson => bpJson && bpJson.producer_account_name === producer.owner) || {}
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
      console.log(`succefully saved ${owner}`);
    } catch (error) {
      console.error(error);
    }
  };

  for (let bp of producersData) {
    await saveBP(bp);
  }

  // TODO : better error handling, report and retry unfulffilled
};

const run = async () => {
  try {
    updateBlockProducersData();
  } catch (err) {
    console.error(err);
  }
};

run();
