const express = require("express");
const router = express.Router();
const { OrderedMeals } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post('/request',validateToken, async (req, res) => {
    try {
      const { quantity, UserId, epf } = req.body;
  
      await OrderedMeals.create({
        quantity,
        UserId:UserId,
        epf:epf,
      });
  
      res.status(201).json({ message: 'Selected meal details stored successfully.' });
    } catch (error) {
      console.error('Error storing selected meal details:', error);
      res.status(500).json({ message: 'Error storing selected meal details.' });
    }
  });

module.exports = router;