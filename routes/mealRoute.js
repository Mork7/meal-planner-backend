import express from "express";
import Meal from "../models/mealModel.js";

const router = express.Router();

// Route to create a new meal
router.post("/create", async (req, res) => {
  try {
    const { name, ingredients } = req.body;

    const meal = new Meal({ name, ingredients });

    await meal.save();

    return res
      .status(201)
      .json({
        id: meal._id,
        name: meal.name,
        ingredients: meal.ingredients,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Route for fetching all meals from db
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find({});
    const mealDtos = meals.map((meal) => ({
      id: meal._id,
      name: meal.name,
      ingredients: meal.ingredients,
    }));
    return res.status(200).json(mealDtos);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Route for getting single meal from db
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await meal.findById(id);

    return res.status(200).json(meal);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Route to update meal name or ingredients
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.ingredients) {
      return res.status(400).send({
        message: "Send both meal name and ingredients",
      });
    }

    const { id } = req.params;
    const mealToUpdate = await Meal.findByIdAndUpdate(id, req.body);

    if (!mealToUpdate) {
      return res.status(404).json({ message: "Meal not found" });
    } else {
      return res.status(200).json({ message: "Meal updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await Meal.findById(id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    await Meal.findByIdAndDelete(id);

    return res.status(200).send({ message: "Deleted successfuly" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
