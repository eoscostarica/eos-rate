const { DB_NAME, DB_USER, DB_HOST, DB_PORT, DB_PASSWORD } = process.env

const massiveConfig = {
  host: DB_HOST || 'localhost',
  port: DB_PORT || 5432,
  database: DB_NAME || 'eosrate',
  user: DB_USER || 'user',
  password: DB_PASSWORD || 'pass'
}

module.exports = massiveConfig

// console.log('==== massiveConfig ====')
// console.log(massiveConfig)
