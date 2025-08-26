// routes/users.js
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const bcrypt = require("bcrypt"); // Import bcrypt

const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432,
});

// ... (existing POST / route for registration) ...

// POST route to log in a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists in the database
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 2. Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 3. Send a success response
    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to log in." });
  }
});

module.exports = router;
