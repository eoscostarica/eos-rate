let rate = {
  costaricaeos: {
    transparency: 10,
    testnets: 8,
    tooling: 7,
    infra: 6,
    community: 10
  },
  alohaeos: {
    transparency: 10,
    testnets: 8,
    tooling: 7,
    infra: 6,
    community: 10
  }
};

rate = JSON.stringify(JSON.stringify(rate));

console.log(rate);

const fs = require("fs");
fs.writeFile("./contracts/rateproducer/rateproducer.json", rate, function(err) {
  if (err) {
    console.log(err);
  }
});
