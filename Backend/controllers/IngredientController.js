const Ingredient = require("../models/Ingredient");
const User = require("../models/User");
// const Comment = require("../models/Comment");

const IngredientController = {
  async create(req, res, next) {
    try {
      const ingredient = await Ingredient.create({
        ...req.body,
        userId: req.user._id,
        // image: req.file.filename,
      });
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { ingredientIds: ingredient._id } },
        { new: true }
      );

      res.status(201).send(ingredient);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async update(req, res) {
    try {
      const ingredient = await Ingredient.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "Ingredient updated successfully!", ingredient });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      await Ingredient.findByIdAndDelete(req.params._id);
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { ingredientIds: req.params._id } },
        { new: true }
      );
      res.send({ message: "Ingredient deleted succesfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error trying to remove the ingredient" });
    }
  },

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 30 } = req.query;
      const ingredients = await Ingredient.find({})
        .limit(limit)
        .skip((page - 1) * limit);
      res.status(200).send(ingredients);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async getById(req, res) {
    try {
      const ingredient = await Ingredient.findById(req.params._id)
        .populate({
          path: "recipeIds",
          select: "recipeName",
        })
      res.send(ingredient);
    } catch (error) {
      console.error(error);
    }
  },

  async getByName(req, res) {
    try {
      if (req.params.product.length > 20) {
        return res.status(400).send("Search too long");
      }
      console.log(req.params.product)
      const product = new RegExp(req.params.product, "i");
      const ingredients = await Ingredient.find({ product })
        .populate({
          path: "recipeIds",
          select: "recipeName",
        });
      res.send(ingredients);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = IngredientController;
