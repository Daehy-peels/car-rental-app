// src/routes/reviews.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST a new review for a car
router.post("/", async (req, res) => {
  const { user_id, car_id, rating, comment } = req.body;
  try {
    // Check if the user has a completed booking for this car
    const bookingCheck = await pool.query(
      "SELECT * FROM bookings WHERE user_id = $1 AND car_id = $2",
      [user_id, car_id]
    );

    if (bookingCheck.rows.length === 0) {
      return res
        .status(403)
        .json({
          error: "You must have a booking for this car to leave a review.",
        });
    }

    // Check if the user has already reviewed this car
    const existingReview = await pool.query(
      "SELECT * FROM reviews WHERE user_id = $1 AND car_id = $2",
      [user_id, car_id]
    );

    if (existingReview.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "You have already reviewed this car." });
    }

    const newReview = await pool.query(
      "INSERT INTO reviews (user_id, car_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, car_id, rating, comment]
    );

    res.json(newReview.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to post review." });
  }
});

// GET all reviews for a specific car
router.get("/car/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const reviews = await pool.query(
      `SELECT r.*, u.username
       FROM reviews r
       JOIN users u ON r.user_id = u.user_id
       WHERE r.car_id = $1
       ORDER BY r.created_at DESC`,
      [carId]
    );
    res.json(reviews.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve reviews." });
  }
});

// GET the average rating for a specific car
router.get("/car/:carId/average-rating", async (req, res) => {
  try {
    const { carId } = req.params;
    const result = await pool.query(
      "SELECT AVG(rating) AS average_rating FROM reviews WHERE car_id = $1",
      [carId]
    );
    const averageRating = result.rows[0].average_rating;
    res.json({
      average_rating: averageRating
        ? parseFloat(averageRating).toFixed(1)
        : "0.0",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get average rating." });
  }
});

module.exports = router;
