const { hasuraUtil } = require('../utils')

const hyperionService = require('./hyperion')

const sleep = seconds => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), seconds * 1000)
  })
}

const run = async ({ name, action, interval }) => {
  try {
    await action()
  } catch (error) {
    console.log(`${name} ERROR =>`, error.message)
  }

  console.log(`COMPLETED ${name} WORKER`)

  if (!interval) {
    return
  }

  console.log(`${name} WORKER WILL RUN AGAIN IN ${interval / 60} MINUTES`)
  await sleep(interval)
  run({ name, action, interval })
}

const init = async () => {
  await hasuraUtil.hasuraAssembled()
  run(hyperionService.syncWorker())
}

module.exports = {
  init
}
