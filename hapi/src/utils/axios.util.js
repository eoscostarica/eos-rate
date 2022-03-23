const axios = require('axios')
const https = require('https')

const instance = axios.create({
  timeout: 5000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

module.exports = instance
