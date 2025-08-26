// src/routes/bookings.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all bookings (new route for the admin side)
router.get("/", async (req, res) => {
  try {
    const allBookings = await pool.query(
      `SELECT
          b.booking_id,
          b.start_date,
          b.end_date,
          b.total_price,
          u.username,
          u.email,
          c.make,
          c.model
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.user_id
      LEFT JOIN cars c ON b.car_id = c.car_id
      ORDER BY b.start_date DESC`
    );
    res.json(allBookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve all bookings." });
  }
});

// GET bookings for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userBookings = await pool.query(
      `SELECT
          b.booking_id,
          c.make,
          c.model,
          c.image_url,
          b.start_date,
          b.end_date,
          b.total_price
        FROM bookings b
        JOIN cars c ON b.car_id = c.car_id
        WHERE b.user_id = $1
        ORDER BY b.start_date DESC`,
      [userId]
    );
    res.json(userBookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve user bookings." });
  }
});

// POST route to create a new booking
router.post("/", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Start a transaction

    const { user_id, car_id, start_date, end_date } = req.body;

    // Validate input data
    if (!user_id || !car_id || !start_date || !end_date) {
      await client.query("ROLLBACK");
      return res
        .status(400)
        .json({ error: "Missing required booking information." });
    }

    // Check for existing bookings that overlap with the requested dates
    const existingBookings = await client.query(
      "SELECT * FROM bookings WHERE car_id = $1 AND (start_date, end_date) OVERLAPS (DATE($2), DATE($3))",
      [car_id, start_date, end_date]
    );

    if (existingBookings.rows.length > 0) {
      await client.query("ROLLBACK");
      return res
        .status(409)
        .json({ error: "Car is already booked for the selected dates." });
    }

    // Get the car's price to calculate the total booking price
    const carResult = await client.query(
      "SELECT price_per_day FROM cars WHERE car_id = $1",
      [car_id]
    );
    if (carResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Car not found." });
    }
    const price_per_day = carResult.rows[0].price_per_day;

    // Calculate total price based on number of days
    const start = new Date(start_date);
    const end = new Date(end_date);
    const duration = (end - start) / (1000 * 60 * 60 * 24) + 1; // +1 to include both start and end days
    const total_price = duration * price_per_day;

    // Insert the new booking with the calculated total_price
    const newBooking = await client.query(
      "INSERT INTO bookings (user_id, car_id, start_date, end_date, total_price) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_id, car_id, start_date, end_date, total_price]
    );

    await client.query("COMMIT"); // Commit the transaction
    res.status(201).json(newBooking.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Database error during booking:", err.message);
    res
      .status(500)
      .json({ error: "Booking failed due to an internal server error." });
  } finally {
    client.release();
  }
});

// GET bookings for a specific car
router.get("/car/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const carBookings = await pool.query(
      "SELECT start_date, end_date FROM bookings WHERE car_id = $1 ORDER BY start_date ASC",
      [carId]
    );
    res.json(carBookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve car bookings." });
  }
});

// DELETE route to cancel a booking
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await pool.query(
      "DELETE FROM bookings WHERE booking_id = $1 RETURNING *",
      [id]
    );
    if (deletedBooking.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }
    res.json({ message: "Booking cancelled successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to cancel booking." });
  }
});

module.exports = router;
