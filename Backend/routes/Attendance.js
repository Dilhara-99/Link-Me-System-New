const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const { username, epf, date, inTime, outTime } = req.body;
    const attendance = await Attendance.create({
      username,
      epf,
      date,
      inTime,
      outTime,
    });
    res.status(201).json({ success: true, attendance });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ success: false, error: "Failed to add attendance" });
    res.json();
  }
});

router.get("/attendance-details/:id",validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { fromDate, toDate } = req.query;

    const startDate = fromDate ? new Date(fromDate) : null;
    const endDate = toDate ? new Date(toDate) : null;

    const dateCondition = {};
    if (startDate && endDate) {
      dateCondition[Op.between] = [startDate, endDate];
    } else if (startDate) {
      dateCondition[Op.gte] = startDate;
    } else if (endDate) {
      dateCondition[Op.lte] = endDate;
    }

    const attendance = await Attendance.findAll({
      where: {
        epf: id,
        date: dateCondition,
      },
      order: [["date", "ASC"]],
    });

    res.json(attendance);
  } catch (error) {
    console.error("Error fetching attendance details:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve attendance details", error });
  }
});

router.get("/attendance-details-to-manage/:id/:date", async (req, res) => {
  try {
    const id = req.params.id;
    const date = req.params.date;

    const attendanceToManage = await Attendance.findOne({
      where: {
        epf: id,
        date: date,
      },
    });

    res.json(attendanceToManage);
  } catch (error) {
    console.error("Error fetching attendance details:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve attendance details", error });
  }
});

router.put("/update/:attendanceId", async (req, res) => {
  try {
    const attendanceId = req.params.attendanceId;
    const { inTime, outTime } = req.body;

    await Attendance.update({ inTime, outTime }, { where: { attendanceId } });

    res.json("in time and out time updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error updating in time or out time");
  }
});

router.get("/allAttendanceDetails", validateToken, async (req, res) => {
  try {
    const listOfAllAttendance = await Attendance.findAll();

    res.json(listOfAllAttendance);
  } catch (error) {
    console.error("Error fetching All attendance details:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve All attendance details", error });
  }
});

module.exports = router;
