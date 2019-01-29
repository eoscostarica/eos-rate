const chalk = require("chalk");

const logUpdate = (payload, blockInfo, context) => {
  console.log("============= logUpdate =================");
  console.log(chalk.green("\n┏(-_-)┛┗(-_-﻿ )┓┗(-_-)┛┏(-_-)┓\n"));
  console.info("State updated:\n", JSON.stringify({ payload, blockInfo, context }, null, 2));
};

const updateProducerRatings = (payload, blockInfo, context) => {
  console.log("============= updateProducerRatings =================");
  console.info("State updated:\n", JSON.stringify({ payload, blockInfo, context }, null, 2));
};

const updaters = [
  {
    actionType: "eoseosrateio::rateproducer",
    apply: updateProducerRatings
  }
];

const effects = [
  {
    actionType: "eoseosrateio::rateproducer",
    run: logUpdate
  }
];

const handlerVersion = {
  versionName: "v1",
  updaters,
  effects
};

module.exports = handlerVersion;
