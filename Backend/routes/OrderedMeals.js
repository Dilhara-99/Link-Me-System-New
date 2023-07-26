const express = require("express");
const router = express.Router();
const { OrderedMeals } = require("../models");

router.post('/store', async (req, res) => {
    try {
      const { mealId, quantity, username } = req.body;
  
      await OrderedMeals.create({
        mealId,
        quantity,
        username,
      });
  
      res.status(201).json({ message: 'Selected meal details stored successfully.' });
    } catch (error) {
      console.error('Error storing selected meal details:', error);
      res.status(500).json({ message: 'Error storing selected meal details.' });
    }
  });

module.exports = router;