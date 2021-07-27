
module.exports = {
  host: process.env.HAPI_POSTGRES_HOST || 'postgres',
  port: process.env.HAPI_POSTGRES_PORT || 5432,
  database: process.env.HAPI_POSTGRES_DB || 'eosrate',
  user: process.env.HAPI_POSTGRES_USER || 'user',
  password: process.env.HAPI_POSTGRES_PASSWORD || 'pass'
}