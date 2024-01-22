const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const RecipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: [true, "Please, enter a recipe name"],
    },
    type: {
      type: String,
      required: [true, "Please, enter a type"],
    },
    presentation: {
      type: Number,
      required: [true, "Please, enter presentation data"],
    },
    ingredients: [{ ingredient: { type: ObjectId, ref: "Ingredient" }, qty: { type: Number, required: [true, "Please, enter a quantity"] } }],
    instructions: {
      type: String, maxLength: 1000
    },
    note: {
      type: String,
    },
    userId: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;