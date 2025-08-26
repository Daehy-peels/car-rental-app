// routes/cars.js
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432,
});

// GET all cars
router.get("/", async (req, res) => {
  try {
    const allCars = await pool.query("SELECT * FROM cars");
    res.json(allCars.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve cars." });
  }
});

// POST a new car
router.post("/", async (req, res) => {
  try {
    const { make, model, year, price_per_day, description, image_url } =
      req.body;
    const newCar = await pool.query(
      "INSERT INTO cars (make, model, year, price_per_day, description, image_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [make, model, year, price_per_day, description, image_url]
    );
    res.json(newCar.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add new car." });
  }
});

// GET a single car by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await pool.query("SELECT * FROM cars WHERE car_id = $1", [id]);
    if (car.rows.length === 0) {
      return res.status(404).json({ error: "Car not found." });
    }
    res.json(car.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve car." });
  }
});

// UPDATE a car's information
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      make,
      model,
      year,
      price_per_day,
      description,
      image_url,
      is_available,
    } = req.body;
    const updatedCar = await pool.query(
      "UPDATE cars SET make = $1, model = $2, year = $3, price_per_day = $4, description = $5, image_url = $6, is_available = $7 WHERE car_id = $8 RETURNING *",
      [
        make,
        model,
        year,
        price_per_day,
        description,
        image_url,
        is_available,
        id,
      ]
    );
    if (updatedCar.rows.length === 0) {
      return res.status(404).json({ error: "Car not found." });
    }
    res.json(updatedCar.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update car." });
  }
});

// DELETE a car
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await pool.query(
      "DELETE FROM cars WHERE car_id = $1 RETURNING *",
      [id]
    );
    if (deletedCar.rows.length === 0) {
      return res.status(404).json({ error: "Car not found." });
    }
    res.json({ message: `Car with ID ${id} deleted successfully.` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete car." });
  }
});

module.exports = router;
