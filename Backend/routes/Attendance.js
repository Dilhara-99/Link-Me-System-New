const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post('/', async (req, res) => {
  try {
    const { username, date, inTime, outTime } = req.body;
    const attendance = await Attendance.create({
      username,
      date,
      inTime,
      outTime,
    });
    res.status(201).json({ success: true, attendance });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ success: false, error: 'Failed to add attendance' });
    res.json();
  }
});

router.get("/attendance-details", validateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const attendance = await Attendance.findAll({
      where: { username: username },
      order: [["date", "ASC"]], 
    });
    res.json(attendance);
  } catch (error) {
    console.error("Error fetching attendance details:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve attendance details" });
  }
});


module.exports = router;

