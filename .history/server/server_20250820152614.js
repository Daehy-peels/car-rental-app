// server.js
const express = require("express");
const cors = require("cors");
const carsRouter = require("./routes/cars"); // Import the cars router

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Main API Routes
app.use("/api/cars", carsRouter);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
