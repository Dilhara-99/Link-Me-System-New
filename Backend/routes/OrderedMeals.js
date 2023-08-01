const express = require("express");
const router = express.Router();
const { OrderedMeals,Meals } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  try {
    const { meals, epf } = req.body;

    const existingMeals = await OrderedMeals.findAll({
      where: {
        mealCode: meals.map((meal) => meal.mealCode),
        epf: epf,
      },
    });

    if (existingMeals.length > 0) {
      res
        .status(409)
        .json({
          message: "Meal with the same mealCode and epf already exists.",
        });
      return;
    }

    await OrderedMeals.bulkCreate(
      meals.map((meal) => ({
        mealCode: meal.mealCode,
        quantity: meal.quantity,
        epf: epf,
      }))
    );

    res
      .status(201)
      .json({ message: "Selected meal details stored successfully." });
  } catch (error) {
    console.error("Error storing selected meal details:", error);
    res.status(500).json({ message: "Error storing selected meal details." });
  }
});

module.exports = router;
