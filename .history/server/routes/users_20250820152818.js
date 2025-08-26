// routes/users.js
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const bcrypt = require("bcrypt"); // Import bcrypt

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432,
});

// POST route to register a new user
router.post("/", async (req, res) => {
  try {
    // 1. Destructure the data from the request body
    const { username, email, password } = req.body;

    // 2. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    // 4. Send back the new user data (without the password hash)
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to register user." });
  }
});

module.exports = router;
