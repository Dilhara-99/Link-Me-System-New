const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/",validateToken, async (req, res) => {
  const { tempid, username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      tempid: tempid,
      username: username,
      password: hash,
    })
      .then(() => {
        res.json("Success");
        res.status(201).json({ message: "ok" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json("Error creating user");
      });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      res.status(404).json({ error: "User does not exist" });
    } else {
      if (user.tempid && user.tempid !== null && user.department === null) {
        bcrypt.compare(password, user.password).then((match) => {
          if (!match) {
            res.status(401).json({ error: "Invalid password" });
          } else {
            res.json("you are signed up");
          }
        });
      } else {
        res.status(401).json({ error: "You are already registered" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

router.post("/password-reset-modal", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.status(404).json({ error: "User does not exist" });
  } else {
    if (user.tempid === null && user.department !== null) {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          res.status(401).json({ error: "Invalid password" });
        } else {
          res.json("reset your password");
        }
      });
    } else {
      res.status(401).json({ error: "You should register before logging in" });
    }
  }
});

router.post("/login/dashboard", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      res.status(404).json({ error: "User does not exist" });
    } else {
      if (user.tempid && user.tempid === "0000") {
        bcrypt.compare(password, user.password).then((match) => {
          if (!match) {
            res.status(401).json({ error: "Invalid password" });
          } else {
            const accessToken = sign(
              { username: user.username, id: user.id },
              "importantsecret"
            );
            res.json(accessToken);
          }
        });
      } else {
        res
          .status(401)
          .json({ error: "You are not authorized to access this route" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

router.put("/login/abc/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findOne({ where: { id: id } });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      user.tempid = null;
      await user.save();
      res.json("tempid updated successfully");
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating tempid" });
  }
});

router.put("/login/update/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { department, designation, epf } = req.body;
    const updatedData = { department, designation };

    if (epf) {
      updatedData.username = epf;
    }

    await Users.update(updatedData, { where: { id } });

    res.json("Enrolment updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error updating enrolment");
  }
});

router.put("/login/password-update/:id", async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    user.tempid = "0000";
    await user.save();

    res.json({ message: "Password reset and tempid updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating password and tempid" });
  }
});

router.get("/login/users-data", validateToken, async (req, res) => {
  try {
    const listOfEmplyees = await Users.findAll();
    res.status(200).json(listOfEmplyees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/login/delete-user/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const listOfEmplyees = await Users.findByPk(id);

    if (!listOfEmplyees) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await listOfEmplyees.destroy();

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/login/edit-login-details/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const { username, tempid } = req.body;

    await Users.update({ username, tempid }, { where: { id } });

    res.json("Successfully updated employee's login details");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error editing login details");
  }
});

module.exports = router;
