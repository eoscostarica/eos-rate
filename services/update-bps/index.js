#!/usr/bin/env node
const EosApi = require('eosjs-api')
const massive = require('massive')
const request = require('request-promise')

const dbConfig = require('./dbConfig')

// gets data from mainnet
const getBlockProducersData = async () => {
  const eos = EosApi({
    httpEndpoint: process.env.EOS_API_ENDPOINT || 'https://jungle.eosio.cr',
    verbose: false
  })
  const { rows: producers } = await eos.getProducers({ json: true, limit: 10000 })

  const allProducers = producers.reduce((result, producer) => {
    if (!producer.is_active || !parseInt(producer.total_votes)) return result

    return [
      ...result,
      {
        owner: producer.owner,
        system: { ...producer },
        bpJson: {}
      }
    ]
  }, [])

  const urls = allProducers
    .filter(({ bpJson, system }) => !Object.keys(bpJson).length && system.url)
    .map(({ system: { url } }) => {
      let result = url
      if (url.startsWith('https://') || url.startsWith('http://')) {
        result = `${url}`
      }
      if (!url.startsWith('http')) {
        result = `http://${url}`
      }
      if (!url.endsWith('.json')) {
        result = `${result}/bp.json`
      }
      return result
    })

  console.log('urls', urls.length)

  const allJsons = []

  for (let i = 0; i < urls.length; i++) {
    try {
      let bp = await request({
        url: urls[i],
        method: 'get',
        json: true,
        timeout: 2000
      })
      console.log('result bp', i)
      allJsons.push(bp)
    } catch (error) {
    }
  }

  const result = allProducers.map(producer => ({
    ...producer,
    bpJson: allJsons.find(bpJson => bpJson && bpJson.producer_account_name === producer.owner) || {}
  }))

  console.log('xavier', result)

  return result
}

// updates the postgresdb
const updateBlockProducersData = async () => {
  console.log('==== updating block producer info ====')
  const db = await massive(dbConfig)
  const producersData = await getBlockProducersData()

  const saveBP = async ({ owner, system, bpJson: bpjson }) => {
    console.log(`try saving ${owner}`)
    const bpData = {
      owner,
      system,
      bpjson
    }

    try {
      const result = await db.producers.save(bpData)
      if (!result) {
        const insertResult = await db.producers.insert(bpData)
        if (!insertResult) {
          console.log(`couldnt save or insert ${owner}`)
          return
        }
      }
      console.log(`succefully saved ${owner}`)
    } catch (error) {
      console.error(error)
    }
  }

  for (let bp of producersData) {
    await saveBP(bp)
  }

  // TODO : better error handling, report and retry unfulffilled
};

(async () => {
  try {
    console.log('blocks', await updateBlockProducersData())
  } catch (err) {
    console.log('!!!!', err)
  }
})()
