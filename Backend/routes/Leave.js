const express = require("express");
const router = express.Router();
const { Leave } = require("../models");

router.post("/", async (req, res) => {
  const { leaveType, fromDate, toDate, numberOfDays, coveringPerson, epf } =
    req.body;

  try {
    const existingLeave = await Leave.findOne({
      where: {
        fromDate: fromDate,
        toDate: toDate,
        epf: epf,
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
    });

    res.json(leaveData);
  } catch (error) {
    console.error("Error adding leave request:", error);
    res.status(500).json("Error adding leave request");
  }
});

module.exports = router;
