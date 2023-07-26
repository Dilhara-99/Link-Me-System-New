const express = require("express");
const router = express.Router();
const { Advertesement } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/",validateToken, async (req, res) => {
  try {
    const { closingDate, position, status } = req.body;

    const advertisement = await Advertesement.create({
      closingDate: closingDate,
      position: position,
      status: status,
    });

    res.status(201).json({ message: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/advertised-data", async (req, res) => {
  try {
    const recruitments = await Advertesement.findAll({
      where: {
        status: "advertised",
      },
    });
    res.status(200).json(recruitments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/remove-advertesement/:id",validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const advertisement = await Advertesement.findByPk(id);

    if (!advertisement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await advertisement.destroy();

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/edit-advertesement-details/:id",validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { closingDate,position } = req.body;

    await Advertesement.update({ closingDate,position }, { where: { id } });

    res.json("Successfully updated advertesement details");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error editing advertesement details");
  }
});

module.exports = router;
