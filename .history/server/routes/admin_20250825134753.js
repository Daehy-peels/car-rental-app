// routes/admin.js

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // Assuming you have a Booking model
const Car = require("../models/Car"); // Assuming you have a Car model

// GET /api/admin/reports - Fetches financial and reporting data
router.get("/reports", async (req, res) => {
  try {
    // 1. Calculate Total Revenue
    const allBookings = await Booking.find({});
    const totalRevenue = allBookings.reduce(
      (sum, booking) => sum + booking.total_price,
      0
    );

    // 2. Count Total Bookings
    const totalBookings = await Booking.countDocuments({});

    // 3. Find Most Popular Car
    const popularCar = await Booking.aggregate([
      {
        $group: {
          _id: "$car_id",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    let mostPopularCar = "N/A";
    if (popularCar.length > 0) {
      const car = await Car.findById(popularCar[0]._id);
      mostPopularCar = car ? `${car.make} ${car.model}` : "N/A";
    }

    // 4. Send the combined data as a single JSON response
    res.status(200).json({
      totalRevenue: totalRevenue,
      totalBookings: totalBookings,
      mostPopularCar: mostPopularCar,
    });
  } catch (error) {
    console.error("Error fetching admin report:", error);
    res.status(500).json({ message: "Failed to fetch report data" });
  }
});

module.exports = router;
