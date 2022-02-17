#!/usr/bin/env node
const EosApi = require('eosjs-api')
const request = require('request-promise')
const { massiveDB, chainConfig } = require('../config')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle3.cryptolions.io'

const getBlockProducersData = async () => {
  const eos = EosApi({
    httpEndpoint: HAPI_EOS_API_ENDPOINT,
    verbose: false
  })

  let producers

  try {
    const { rows: tempProducers } = await eos.getProducers({
      json: true,
      limit: 1000
    })

    producers = tempProducers
  } catch (err) {
    console.log(`Database connection error ${err}`)
    return []
  }

  const allProducers = await producers.reduce(async (result, producer) => {
    if (!producer.is_active || !parseInt(producer.total_votes) || !producer.url)
      return await result
    if (
      !producer.url.startsWith('https://') &&
      !producer.url.startsWith('http://')
    )
      producer.url = `http://${producer.url}`

    console.log(
      `${producer.owner}   TOTAL VOTES: ----> ${producer.total_votes}`
    )
    try {
      const chainURL = await request({
        url: `${producer.url}/chains.json`,
        method: 'get',
        json: true,
        timeout: 10000
      })

      producer.url = `${producer.url}${
        chainURL.chains[chainConfig.chainID] || '/bp.json'
      }`
    } catch (err) {
      console.log(
        `Chains.json doesnt exist for ${producer.owner}, setting default`
      )
      producer.url = `${producer.url}/bp.json`
    }
    console.log(`New url for ${producer.owner} is ${producer.url}`)
    return [
      ...(await result),
      {
        owner: producer.owner,
        system: { ...producer },
        bpJson: {},
        candidateName: null
      }
    ]
  }, Promise.resolve([]))

  console.log('Getting bpJson information for BPs...')

  const producersBPJSON = []
  for (const producer of allProducers) {
    try {
      const bp = await request({
        url: producer.system.url,
        method: 'get',
        json: true,
        timeout: 10000
      })
      if (bp['producer_account_name'] && bp['producer_account_name'] !== '') {
        producer['bpJson'] = bp
        producer['candidateName'] = bp.org
          ? (bp.org.candidate_name || '').toLowerCase()
          : null
        producersBPJSON.push(producer)
      }
    } catch (err) {
      console.log(`Failed to add bpJson info for ${producer.owner}`)
    }
  }

  console.log(`Incoming total producers ${allProducers.length}`)
  console.log(`Outgoing total producers ${producersBPJSON.length}`)

  return producersBPJSON
}

const updateBlockProducersData = async () => {
  console.log('==== Updating block producer info ====')
  const producersData = await getBlockProducersData()

  producersData.forEach(async bp => {
    const { owner, system, bpJson: bpjson, candidateName } = bp
    const bpData = { owner, system, bpjson, candidate_name: candidateName }

    try {
      const saveBPResult = await (await massiveDB).producers.save(bpData)
      const dbResult = saveBPResult
        ? saveBPResult
        : await (await massiveDB).producers.insert(bpData)
      console.log(
        `Save or insert of ${owner} was ${
          dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
        }`
      )
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  })
}

updateBlockProducersData()
