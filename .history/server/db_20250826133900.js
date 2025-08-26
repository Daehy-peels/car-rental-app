// db.js
const { Pool } = require("pg");

// This creates a single connection pool that will be used across your entire application.
// Using a pool is more efficient than creating a new connection for every request.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// We export the entire pool object so other files can connect to the database.
module.exports = pool;
