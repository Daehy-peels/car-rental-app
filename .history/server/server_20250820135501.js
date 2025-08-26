// server.js
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: "your_username", // Replace with your PostgreSQL username
  host: "localhost",
  database: "your_database_name", // Replace with the name of your database
  password: "your_password", // Replace with your PostgreSQL password
  port: 5432,
});

// A simple GET route to test the database connection
app.get("/test-db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW() as now");
    const currentTime = result.rows[0].now;
    client.release(); // Release the client back to the pool

    res.status(200).json({
      message: "Successfully connected to the database!",
      currentTime: currentTime,
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({
      message: "Failed to connect to the database.",
      error: err.message,
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
