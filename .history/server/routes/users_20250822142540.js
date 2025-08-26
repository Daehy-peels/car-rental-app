// src/routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

// ... (existing POST routes for register and login)

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
