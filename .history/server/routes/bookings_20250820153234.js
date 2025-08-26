// routes/bookings.js
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432,
});

// GET all bookings (for Admin)
router.get("/", async (req, res) => {
  try {
    const allBookings = await pool.query(
      "SELECT * FROM bookings ORDER BY booking_id DESC"
    );
    res.json(allBookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve bookings." });
  }
});

// POST a new booking
router.post("/", async (req, res) => {
  const client = await pool.connect();
  try {
    const { user_id, car_id, start_date, end_date } = req.body;

    // Check for car availability
    const availableCar = await client.query(
      "SELECT * FROM cars WHERE car_id = $1 AND is_available = TRUE",
      [car_id]
    );

    if (availableCar.rows.length === 0) {
      client.release();
      return res
        .status(409)
        .json({ error: "Car is not available for booking." });
    }

    // Calculate total price based on price_per_day and duration
    const pricePerDay = availableCar.rows[0].price_per_day;
    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);
    const durationInDays = (endDateObj - startDateObj) / (1000 * 60 * 60 * 24);
    const total_price = pricePerDay * durationInDays;

    // Start a transaction for data integrity
    await client.query("BEGIN");

    // Insert the new booking
    const newBooking = await client.query(
      "INSERT INTO bookings (user_id, car_id, start_date, end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, car_id, start_date, end_date, total_price, "confirmed"]
    );

    // Update the car's availability status to FALSE
    await client.query(
      "UPDATE cars SET is_available = FALSE WHERE car_id = $1",
      [car_id]
    );

    // Commit the transaction
    await client.query("COMMIT");

    res.status(201).json(newBooking.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err.message);
    res.status(500).json({ error: "Failed to create booking." });
  } finally {
    client.release();
  }
});

module.exports = router;
