// server.js


const express = require("express");
const cors = require("cors");
const carsRouter = require("./routes/cars");
const usersRouter = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const reviewsRouter = require("./routes/reviews");
const adminRoutes = require("./routes/admin");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Main API Routes
app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewsRouter);
app.use("/api/admin", adminRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
