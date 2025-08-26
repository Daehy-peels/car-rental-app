// db.js
const { Pool } = require("pg");

// This creates a single connection pool that will be used across your entire application.
// Using a pool is more efficient than creating a new connection for every request.
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "car_rental",
  password: "Msh@lalaland01",
  port: 5432,
});

// We export the entire pool object so other files can connect to the database.
module.exports = pool;
