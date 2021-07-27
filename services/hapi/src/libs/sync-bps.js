#!/usr/bin/env node
const EosApi = require('eosjs-api')
const massive = require('massive')
const request = require('request-promise')
const { massiveConfig } = require('../config')

const EOS_API_ENDPOINT = process.env.EOS_API_ENDPOINT || 'https://jungle.eosio.cr'


const getBlockProducersData = async () => {
  const eos = EosApi({
    httpEndpoint: EOS_API_ENDPOINT,
    verbose: false
  })
  
  const { rows: producers } = await eos.getProducers({
    json: true,
    limit: 1000
  })

  const allProducers = producers.reduce((result, producer) => {
    if (!producer.is_active || !parseInt(producer.total_votes) || !producer.url) return result

    if (!producer.url.startsWith('https://') && !producer.url.startsWith('http://')) producer.url = `http://${producer.url}`
    if (!producer.url.endsWith('.json')) producer.url = `${producer.url}/bp.json`

    console.log(`${producer.owner}   TOTAL VOTES: ----> ${producer.total_votes}`)

    return [
      ...result,
      {
        owner: producer.owner,
        system: { ...producer },
        bpJson: {}
      }
    ]
  }, [])

  console.log('Getting bpJson information for BPs...')

  const producersBPJSON = []
  for (const producer of allProducers) {
    try {
      const bp = await request(
        {
        url: producer.system.url,
        method: 'get',
        json: true,
        timeout: 10000
      })
      if (bp['producer_account_name'] && bp['producer_account_name'] !== '') {
        producer['bpJson'] = bp
        producersBPJSON.push(producer)
      }
    } catch (error) {
      console.log(`Failed to add bpJson info for ${producer.owner}`)
    }
  }

  console.log(`Incoming total producers ${allProducers.length}`)
  console.log(`Outcoming total producers ${producersBPJSON.length}`)

  return producersBPJSON
}

const updateBlockProducersData = async () => {
  console.log('==== Updating block producer info ====')
  const db = await massive(massiveConfig)
  const producersData = await getBlockProducersData()

  producersData.forEach(async (bp) => {
    const { owner, system, bpJson: bpjson } = bp
    const bpData = { owner, system, bpjson }
    
    try {
      const saveBPResult = await db.producers.save(bpData)
      const dbResult = saveBPResult ? saveBPResult : await db.producers.insert(bpData)
      console.log(`Save or insert of ${owner} was ${dbResult ? 'SUCCESSFULLY' : 'UNSUCCESSFULLY'}`)
    } catch (error) { console.log('error', error) }
  })
}

;(async () => {
  try {
    await updateBlockProducersData()
    console.log('OK...')
    process.exit(0)
  } catch (err) {
    console.log('!!!!', err)
  }
})()