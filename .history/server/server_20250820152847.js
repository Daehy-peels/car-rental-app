// server.js
const express = require("express");
const cors = require("cors");
const carsRouter = require("./routes/cars");
const usersRouter = require("./routes/users"); // Import the new users router

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Main API Routes
app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter); // Use the new users router

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
