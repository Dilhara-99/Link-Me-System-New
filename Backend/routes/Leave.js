const express = require("express");
const router = express.Router();
const { Leave } = require("../models");

router.post("/", async (req, res) => {
  try {
    const {
      leaveType,
      leaveBalance,
      fromDate,
      toDate,
      numberOfDays,
      coveringPerson,
      UserId
    } = req.body;

    // Check if the data already exists in the table
    const existingLeave = await Leave.findOne({
      where: {
        leaveType,
        fromDate,
        toDate,
        coveringPerson,
      },
    });

    if (existingLeave) {
      // If the data exists, prevent insertion
      return res.status(409).json({
        success: false,
        error: "This Leave request already exists",
      });
    }

    // If the data does not exist, proceed with the insertion
    const leave = await Leave.create({
      leaveType,
      leaveBalance,
      fromDate,
      toDate,
      numberOfDays,
      coveringPerson,
      UserId:UserId,
    });

    res.json("Successfully submitted leave request");
  } catch (error) {
    console.error("Error requesting leave:", error);
    res.status(500).json({ success: false, error: "Failed to request leave" });
  }
});


module.exports = router;
