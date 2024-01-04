const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const IngredientSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Please, enter a product"],
    },
    type: {
      type: String,
      required: [true, "Please, enter a type"],
    },
    provider: {
      type: String,
      required: [true, "Please, enter a provider"],
    },
    brand: {
      type: String,
      required: [true, "Please, enter a brand"],
    },
    presentation: {
      type: Number,
      required: [true, "Please, enter presentation data"],
    },
    cost: {
      type: Number,
      required: [true, "Please, enter a cost"],
    },
    note: {
      type: String,
    },
    recipeIds: [{ type: ObjectId, ref: "Recipe" }]
  },
  { timestamps: true }
);

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
