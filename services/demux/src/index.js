const { BaseActionWatcher } = require("demux");
const { MongoActionReader } = require("demux-eos");
const ObjectActionHandler = require("./ObjectActionHandler");
const handler = require("./handlerVersions/v1");
const fetch = require("node-fetch");

(async () => {
  const headBlockNum = await fetch("https://jungle.eosio.cr/v1/chain/get_info")
    .then(res => res.json())
    .then(info => info.head_block_num);

  const actionHandler = new ObjectActionHandler([handler]);

  const actionReader = new MongoActionReader(
    "mongodb://190.10.8.205:27017", // mongoEndpoint: the url of the mongodb instance
    headBlockNum, // startAtBlock: the first block relevant to our application
    false, // onlyIrreversible: whether or not to only process irreversible blocks
    600, // the maximum history length
    "EOS" // name of the database
  );

  const actionWatcher = new BaseActionWatcher(actionReader, actionHandler, 500);

  // This must be done before calling watch so the MongoDB connection can be made
  actionReader.initialize().then(() => {
    console.log("demux started...");
    actionWatcher.watch();
  });
})();
