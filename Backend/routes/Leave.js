const express = require("express");
const router = express.Router();
const { Leave } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { leaveType, fromDate, toDate, numberOfDays, coveringPerson, epf } =
    req.body;

  try {
    const existingLeave = await Leave.findOne({
      where: {
        fromDate: fromDate,
        toDate: toDate,
        epf: epf,
        status: "Pending",
      },
    });

    if (existingLeave) {
      return res.status(409).json("Leave request already exists");
    }

    const leaveData = await Leave.create({
      leaveType: leaveType,
      fromDate: fromDate,
      toDate: toDate,
      numberOfDays: numberOfDays,
      coveringPerson: coveringPerson,
      epf: epf,
      status: "Pending",
    });

    res.json(leaveData);
  } catch (error) {
    console.error("Error adding leave request:", error);
    res.status(500).json("Error adding leave request");
  }
});

router.get("/list", async (req, res) => {
  try {
    const listOfLeaves = await Leave.findAll({
      where: {
        status: "Pending",
      },
    });
    res.json(listOfLeaves);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error retrieving meals");
  }
});

router.get("/list/all/:epf", async (req, res) => {
  const { epf } = req.params;
  try {
    const listOfLeaves = await Leave.findAll({
      where: { epf: epf },
      order: [["fromDate", "ASC"]],
    });
    res.json(listOfLeaves);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error retrieving meals");
  }
});

router.put("/approved/:leaveId", async (req, res) => {
  const { leaveId } = req.params;

  try {
    const leaverecord = await Leave.findByPk(leaveId);
    if (leaverecord) {
      await leaverecord.update({ status: "Approved" });
      res.json("Leave status set to Approved");
    } else {
      res.status(404).json("Leave record not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error setting Leave status as Approved");
  }
});

router.put("/rejected/:leaveId", async (req, res) => {
  const { leaveId } = req.params;

  try {
    const leaverecord = await Leave.findByPk(leaveId);
    if (leaverecord) {
      await leaverecord.update({ status: "Rejected" });
      res.json("Leave status set to Rejected");
    } else {
      res.status(404).json("Leave record not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error setting Leave status as Rejected");
  }
});

router.get("/leave-details", validateToken, async (req, res) => {
  try {
    const listOfAllLeaves = await Leave.findAll();

    res.json(listOfAllLeaves);
  } catch (error) {
    console.error("Error fetching All leave details:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve All leave details", error });
  }
});

module.exports = router;
