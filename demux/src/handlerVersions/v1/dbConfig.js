const { POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_PASSWORD } = process.env

const massiveConfig = {
  host: POSTGRES_HOST || '127.0.0.1',
  port: POSTGRES_PORT || 5432,
  database: POSTGRES_DB || 'eosrate',
  user: POSTGRES_USER || 'user',
  password: POSTGRES_PASSWORD || 'pass'
}

module.exports = massiveConfig