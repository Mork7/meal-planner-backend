import mongoose from "mongoose"

const mealSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input a name"]
  },
  ingredients: {
    type: [String],
    required: true
  }
})

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;