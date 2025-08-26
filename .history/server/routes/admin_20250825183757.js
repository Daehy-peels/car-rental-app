// routes/admin.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/admin/reports - Fetches financial and reporting data
router.get("/reports", async (req, res) => {
  try {
    // 1. Calculate Total Revenue and Total Bookings (existing logic)
    const revenueQuery = `SELECT SUM(total_price) AS total_revenue FROM bookings WHERE status = 'confirmed';`;
    const bookingsQuery = `SELECT COUNT(*) AS total_bookings FROM bookings;`;
    const revenueResult = await db.query(revenueQuery);
    const bookingsResult = await db.query(bookingsQuery);

    const totalRevenue = revenueResult.rows[0].total_revenue || 0;
    const totalBookings = bookingsResult.rows[0].total_bookings || 0;

    // 2. Find the Most Popular Car (existing logic)
    const popularCarQuery = `
      SELECT c.make, c.model, COUNT(b.car_id) AS booking_count
      FROM bookings b
      JOIN cars c ON b.car_id = c.car_id
      GROUP BY c.car_id
      ORDER BY booking_count DESC
      LIMIT 1;
    `;
    const popularCarResult = await db.query(popularCarQuery);
    let mostPopularCar = "N/A";
    if (popularCarResult.rows.length > 0) {
      const car = popularCarResult.rows[0];
      mostPopularCar = `${car.make} ${car.model}`;
    }

    // 3. New: Get Monthly Revenue Data for a Line Chart
    const monthlyRevenueQuery = `
      SELECT
          TO_CHAR(date_trunc('month', start_date), 'YYYY-MM') AS month,
          SUM(total_price) AS monthly_revenue
      FROM bookings
      WHERE status = 'confirmed'
      GROUP BY month
      ORDER BY month;
    `;
    const monthlyRevenueResult = await db.query(monthlyRevenueQuery);
    const monthlyRevenue = monthlyRevenueResult.rows;

    // 4. New: Get Car Popularity Data for a Bar Chart
    const carPopularityQuery = `
      SELECT
          CONCAT(c.make, ' ', c.model) AS car_name,
          COUNT(b.car_id) AS booking_count
      FROM bookings b
      JOIN cars c ON b.car_id = c.car_id
      GROUP BY c.car_id, car_name
      ORDER BY booking_count DESC
      LIMIT 5; -- Get top 5 most popular cars
    `;
    const carPopularityResult = await db.query(carPopularityQuery);
    const carPopularity = carPopularityResult.rows;

    // 5. Send all data in a single response
    res.status(200).json({
      totalRevenue: parseFloat(totalRevenue),
      totalBookings: parseInt(totalBookings),
      mostPopularCar: mostPopularCar,
      monthlyRevenue: monthlyRevenue,
      carPopularity: carPopularity,
    });
  } catch (error) {
    console.error("Error fetching admin report:", error);
    res.status(500).json({ message: "Failed to fetch report data" });
  }
});

module.exports = router;
