const express = require("express");
const router = express.Router();
const { Registrations } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const {
    fullName,
    nameWithInitials,
    address,
    nic,
    birthDate,
    gender,
    maritalStatus,
    mobileNumber,
    fixNumber,
    bankName,
    bankBranch,
    accountNumber,
    approveStatus,
  } = req.body;

  Registrations.create({
    fullName: fullName,
    nameWithInitials: nameWithInitials,
    address: address,
    nic: nic,
    birthDate: birthDate,
    gender: gender,
    maritalStatus: maritalStatus,
    mobileNumber: mobileNumber,
    fixNumber: fixNumber,
    bankName: bankName,
    bankBranch: bankBranch,
    accountNumber: accountNumber,
    approveStatus: "Inprogress",
  })
    .then(() => {
      res.json("Successfully added details");
    })
    .catch((error) => {
      res.status(500).json("Error adding details");
    });
});

router.get("/inprogress",validateToken, async (req, res) => {
  try {
    const listofenrolments = await Registrations.findAll({
      where: {
        approveStatus: "Inprogress",
      },
    });
    res.json(listofenrolments);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving clients" });
  }
});

router.get("/get-each/:id",validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const enrolment = await Registrations.findByPk(id);
    res.json(enrolment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the enrolment" });
  }
});

router.put("/toApproved/:id", async (req, res) => { 
  const { id } = req.params;

  try {
    const enrolment = await Registrations.findByPk(id);
    if (enrolment) {
      await enrolment.update({ approveStatus: "Pending" });
      res.json("Enrolment status set to Pending");
    } else {
      res.status(404).json("Enrolment not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error setting enrolment status as Pending");
  }
});


router.get("/pending",validateToken, async (req, res) => {
  try {
    const listofenrolments = await Registrations.findAll({
      where: {
        approveStatus: "Pending",
      },
    });
    res.json(listofenrolments);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving clients" });
  }
});


router.get("/approved",validateToken, async (req, res) => {
  try {
    const listofenrolments = await Registrations.findAll({
      where: {
        approveStatus: "Approved",
      },
    });
    res.json(listofenrolments);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving clients" });
  }
});

router.put("/approved/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const enrolment = await Registrations.findByPk(id);
    if (enrolment) {
      await enrolment.update({ approveStatus: "Approved" });
      res.json("Enrolment approved");
    } else {
      res.status(404).json("Enrolment not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error approving enrolment");
  }
});

router.delete("/reject/:id",validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Registrations.destroy({ where: { id } });
    res.json({ message: "Enrolment deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the enrolment" });
  }
});

router.get("/approved/all", async (req, res) => {
  try {
    const listofenrolment = await Registrations.findAll({
      where: {
        approveStatus: "Approved",
      },
    });
    res.json(listofenrolment);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving clients" });
  }
});

router.get("/approved/all/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const enrolment = await Registrations.findByPk(id);
    res.json(enrolment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the enrolment" });
  }
});

router.put("/login/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { department, designation } = req.body;

    await Registrations.update({ department, designation }, { where: { id } });

    res.json("dep and des updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error updating dep and des");
  }
});

router.post("/epf/:id", async (req, res) => {
  const { id } = req.params;
  const { epf } = req.body;

  try {
    // Find the enrolment record by ID
    const enrolment = await Registrations.findByPk(id);

    if (!enrolment) {
      return res.status(404).send("Enrolment not found");
    }

    // Update the EPF number
    enrolment.epf = epf;
    await enrolment.save();

    res.send("EPF number inserted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/user-details", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Registrations.findOne({
      attributes: ["nameWithInitials","epf"],
      where: { UserId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to retrieve user details" });
  }
});

router.get("/profile-details", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Registrations.findOne({
      attributes: ["nameWithInitials", "epf", "address", "nic", "mobileNumber", "department", "designation"],
      where: { UserId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to retrieve user details" });
  }
});

module.exports = router;
