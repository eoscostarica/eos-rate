
module.exports = {
  host: process.env.POSTGRESQL_HOST || 'localhost',
  port: process.env.POSTGRESQL_PORT || 5432,
  database: process.env.POSTGRESQL_NAME || 'eosrate',
  user: process.env.POSTGRESQL_USER || 'user',
  password: process.env.POSTGRESQL_PASSWORD || 'pass'
}