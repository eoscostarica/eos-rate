
module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'eosrate',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'pass'
}