const express = require("express");
const router = express.Router();
const { LeaveBalance } = require("../models");

router.post("/", async (req, res) => {
    const {
        epf,
        annualBalance,
        casualBalance,
    } = req.body;
  
    LeaveBalance.create({
        epf:epf,
        annualBalance:annualBalance,
        casualBalance:casualBalance,
    })
      .then(() => {
        res.json("Successfully added Leave Balance");
      })
      .catch((error) => {
        res.status(500).json("Error adding Leave Balance");
      });
  });

  router.get("/balance/:epf", async (req, res) => {
    const { epf } = req.params;
    try {
      const leaveBalance = await LeaveBalance.findOne({ where: { epf: epf } });
      if (leaveBalance) {
        res.json(leaveBalance);
      } else {
        res.status(404).json({ message: "Leave balance not found for this user" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving leave balance" });
    }
  });

  router.put("/update-balance/:epf", async (req, res) => {
    const { epf } = req.params;
    const { leaveType, numberOfDays } = req.body;
  
    try {
      // Get the current leave balance for the user
      const leaveBalance = await LeaveBalance.findOne({ where: { epf: epf } });
      if (!leaveBalance) {
        return res.status(404).json({ message: "Leave balance not found for this user" });
      }
  
      // Deduct the leave from the appropriate balance field based on leaveType
      if (leaveType === "annual") {
        leaveBalance.annualBalance -= numberOfDays;
      } else if (leaveType === "casual") {
        leaveBalance.casualBalance -= numberOfDays;
      } else {
        return res.status(400).json({ message: "Invalid leave type" });
      }
  
      // Save the updated leave balance to the database
      await leaveBalance.save();
  
      res.json({ message: "Leave balance updated successfully", leaveBalance });
    } catch (error) {
      console.error("Error updating leave balance:", error);
      res.status(500).json({ message: "Error updating leave balance" });
    }
  });
  
  router.get("/leavebalance/:epf", async (req, res) => {
    try {
      const epf = req.params.epf;
      const leavebalance = await LeaveBalance.findOne({
        where: {
          epf: epf,
        },
      });
  
      res.json(leavebalance);
    } catch (error) {
      console.error("Error fetching leave balance details:", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve leave balance details", error });
    }
  });

  router.put("/updateLeaveBalance/:epf", async (req, res) => {
    try {
      const epf = req.params.epf;
      const updatedData = req.body;
  
      await LeaveBalance.update(updatedData, {
        where: { epf: epf },
      });
  
      res.json({ message: "Leave balance updated successfully." });
    } catch (error) {
      console.error("Error updating leave balance:", error);
      res.status(500).json({ error: "Failed to update leave balance.", error });
    }
  });

module.exports = router;
