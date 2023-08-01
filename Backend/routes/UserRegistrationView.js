const express = require("express");
const router = express.Router();
const { userregistrationview } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await userregistrationview.findOne({ where: { username: username } });
  
      if (!user) {
        res.status(404).json({ error: "User does not exist" });
      } else {
        if (user.epf === null) {
          bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
              res.status(401).json({ error: "Invalid password" });
            } else {
              res.json({ message: "you are signed up", userId: user.id });
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


module.exports = router;
