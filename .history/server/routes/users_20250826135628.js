// routes/users.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const pool = require("../db");

// POST route to register a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

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

// POST route to log in a user with JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Check if the user is in the admin table
    const adminResult = await pool.query(
      "SELECT 1 FROM admin WHERE user_id = $1",
      [user.user_id]
    );
    const isAdmin = adminResult.rows.length > 0;

    // Generate JWT token with admin status
    const token = jwt.sign(
      { id: user.user_id, is_admin: isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return the token and user details to the frontend
    res.status(200).json({
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        is_admin: isAdmin,
      },
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

// PUT route to update user profile
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    if (email !== user.rows[0].email) {
      const existingEmail = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (existingEmail.rows.length > 0) {
        return res.status(409).json({ error: "This email is already in use." });
      }
    }

    const updatedUser = await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE user_id = $3 RETURNING user_id, username, email",
      [username, email, id]
    );

    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

module.exports = router;
