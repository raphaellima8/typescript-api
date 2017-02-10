/* jshint esversion:6*/
module.exports = {
  env: process.env.NODE_ENV,
  db: process.env.DB_NAME,
  dialect: process.env.DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.HOST,
  server_port: process.env.SERVER_PORT,
  pg_port: process.env.PG_PORT,
  db_url: process.env.DB_URL,
  secret: process.env.SECRET,
};
