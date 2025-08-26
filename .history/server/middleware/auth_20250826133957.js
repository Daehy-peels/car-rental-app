// middleware/auth.js

const jwt = require("jsonwebtoken");
const pool = require("../db"); // Assuming your database connection is exported as 'pool'

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use your secret key from .env

    // Check the database to confirm the user has an admin role
    const adminResult = await pool.query(
      "SELECT 1 FROM admin WHERE user_id = $1",
      [decoded.id]
    );

    if (adminResult.rows.length === 0) {
      throw new Error("User is not an admin.");
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Unauthorized access." });
  }
};

module.exports = adminAuth;
