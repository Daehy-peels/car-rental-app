// src/routes/bookings.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all bookings (for Admin)
router.get("/", async (req, res) => {
  try {
    const allBookings = await pool.query(
      `SELECT
         b.booking_id,
         u.username,
         u.email,
         c.make,
         c.model,
         b.start_date,
         b.end_date,
         c.price_per_day,
         (EXTRACT(DAY FROM b.end_date - b.start_date) + 1) * c.price_per_day AS total_price
       FROM bookings b
       JOIN users u ON b.user_id = u.user_id
       JOIN cars c ON b.car_id = c.car_id
       ORDER BY b.start_date DESC`
    );
    res.json(allBookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve bookings." });
  }
});

// POST route to create a new booking
router.post("/", async (req, res) => {
  const client = await pool.connect();
  try {
    const { user_id, car_id, start_date, end_date } = req.body;

    // Check for existing bookings that overlap with the requested dates
    const existingBookings = await client.query(
      "SELECT * FROM bookings WHERE car_id = $1 AND (start_date, end_date) OVERLAPS ($2, $3)",
      [car_id, start_date, end_date]
    );

    if (existingBookings.rows.length > 0) {
      client.release();
      return res
        .status(409)
        .json({ error: "Car is already booked for the selected dates." });
    }

    // Insert the new booking
    const newBooking = await client.query(
      "INSERT INTO bookings (user_id, car_id, start_date, end_date) VALUES($1, $2, $3, $4) RETURNING *",
      [user_id, car_id, start_date, end_date]
    );

    client.release();
    res.status(201).json(newBooking.rows[0]);
  } catch (err) {
    client.release();
    console.error(err.message);
    res.status(500).json({ error: "Booking failed." });
  }
});

module.exports = router;
