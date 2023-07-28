const express = require("express");
const router = express.Router();
const { Meals } = require("../models");
const bodyParser = require("body-parser");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", validateToken, async (req, res) => {
  const { mealCode, mealType, mealName, price } = req.body;

  try {
    const existingMeal = await Meals.findOne({ where: { mealCode: mealCode } });
    if (existingMeal) {
      return res.status(409).json({
        success: false,
        error: "This meal already exists",
      });
    }
  } catch (error) {
    return res.status(500).json("Error checking for existing meal");
  }

  Meals.create({
    mealCode: mealCode,
    mealType: mealType,
    mealName: mealName,
    price: price,
  })
    .then(() => {
      res.json("Successfully added meal details");
    })
    .catch((error) => {
      res.status(500).json("Error adding details");
    });
});


router.get("/list", validateToken, async (req, res) => {
  try {
    const meals = await Meals.findAll();
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error retrieving meals");
  }
});

router.put("/list/edit/:mealCode", validateToken, async (req, res) => {
  try {
    const { mealCode } = req.params;
    const { price } = req.body;

    await Meals.update({ price }, { where: { mealCode } });

    res.json("Successfully updated meal price");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error editing meal");
  }
});

router.delete("/list/:mealCode", validateToken, async (req, res) => {
  try {
    const { mealCode } = req.params;
    await Meals.destroy({ where: { mealCode } });
    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the meal" });
  }
});

module.exports = router;
