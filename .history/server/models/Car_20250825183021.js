// routes/admin.js

const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// GET /api/admin/reports - Fetches financial and reporting data
router.get('/reports', async (req, res) => {
  try {
    // 1. Calculate Total Revenue from all confirmed bookings
    const revenueQuery = `
      SELECT SUM(total_price) AS total_revenue
      FROM bookings
      WHERE status = 'confirmed';
    `;
    const revenueResult = await db.query(revenueQuery);
    const totalRevenue = revenueResult.rows[0].total_revenue || 0;

    // 2. Count Total Bookings
    const bookingsQuery = `
      SELECT COUNT(*) AS total_bookings
      FROM bookings;
    `;
    const bookingsResult = await db.query(bookingsQuery);
    const totalBookings = bookingsResult.rows[0].total_bookings || 0;

    // 3. Find the Most Popular Car by number of bookings
    const popularCarQuery = `
      SELECT c.make, c.model
      FROM bookings b
      JOIN cars c ON b.car_id = c.car_id
      GROUP BY c.car_id
      ORDER BY COUNT(b.car_id) DESC
      LIMIT 1;
    `;
    const popularCarResult = await db.query(popularCarQuery);
    let mostPopularCar = 'N/A';
    if (popularCarResult.rows.length > 0) {
      const car = popularCarResult.rows[0];
      mostPopularCar = `${car.make} ${car.model}`;
    }

    // 4. Send the combined data as a single JSON response
    res.status(200).json({
      totalRevenue: parseFloat(totalRevenue),
      totalBookings: parseInt(totalBookings),
      mostPopularCar: mostPopularCar,
    });
  } catch (error) {
    console.error('Error fetching admin report:', error);
    res.status(500).json({ message: 'Failed to fetch report data' });
  }
});

module.exports = router;