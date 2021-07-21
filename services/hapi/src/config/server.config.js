
module.exports = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
<<<<<<< HEAD
  database: process.env.POSTGRES_DB || 'localdb',
  user: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password'
=======
  database: process.env.POSTGRES_DB || 'eosrate',
  user: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'pass'
>>>>>>> 6c7d53ca24f44c5c5ea01cc7e381435b68aa04e4
}