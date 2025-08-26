// routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

// POST route to register a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES($1, $2, $3) RETURNING *",
      [username, email, password_hash]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to register user." });
  }
});

// POST route to log in a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Return the user's details, including the username
    res.status(200).json({
      user_id: user.rows[0].user_id,
      username: user.rows[0].username, // Add this line
      email: user.rows[0].email,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to log in." });
  }
});

// GET all users (for Admin)
router.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT user_id, username, email FROM users ORDER BY user_id ASC"
    );
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );
    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "User was deleted successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

module.exports = router;
