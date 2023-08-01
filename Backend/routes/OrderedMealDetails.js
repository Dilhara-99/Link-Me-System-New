const express = require('express');
const router = express.Router();
const { orderedmealdetails } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get('/list',validateToken, async (req, res) => {
    try {
      const data = await orderedmealdetails.findAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;