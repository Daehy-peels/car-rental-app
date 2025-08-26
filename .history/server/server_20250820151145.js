// server.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors"); // You've already installed this

const app = express();
const port = 3000;

// Middleware
// Enable CORS for all routes so the frontend can make requests
app.use(cors());
// Parse incoming JSON data
app.use(express.json());

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "car_rental",
  password: "Msh@lalaland01",
  port: 5432,
});

// A simple GET route to test the database connection
app.get("/test-db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW() as now");
    const currentTime = result.rows[0].now;
    client.release();

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

// --- API Routes for Cars ---

// GET all cars
app.get("/api/cars", async (req, res) => {
  try {
    const allCars = await pool.query("SELECT * FROM cars");
    res.json(allCars.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve cars." });
  }
});

// POST a new car
app.post("/api/cars", async (req, res) => {
  try {
    // 1. Destructure the data sent from the frontend
    const { make, model, year, price_per_day, description, image_url } =
      req.body;

    // 2. Insert the data into the cars table
    const newCar = await pool.query(
      "INSERT INTO cars (make, model, year, price_per_day, description, image_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [make, model, year, price_per_day, description, image_url]
    );

    // 3. Send back the newly created car data
    res.json(newCar.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add new car." });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
