
module.exports = {
  host: process.env.HAPI_POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'eosrate',
  user: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'pass'
}