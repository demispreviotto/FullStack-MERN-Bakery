require("dotenv").config();
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;


const AdminController = {
    async createIngredientsFromJson(req, res) {
        try {
            const ingredientsDataJson = require("../data/ingredientsData.json");
            for (const ingredientData of ingredientsDataJson) {
                const { ingredientName, type, provider, brand, presentation, measure, cost, note } = ingredientData;
                if (ingredientName) {
                    const existingIngredient = await Ingredient.findOne({
                        ingredientName,
                        // provider,
                        presentation,
                    });
                    if (!existingIngredient) {
                        const ingredient = new Ingredient({
                            ingredientName,
                            type,
                            provider,
                            brand,
                            presentation,
                            measure,
                            cost,
                            note,
                            doorIds: [],
                        });
                        await ingredient.save();
                    } else {
                        continue;
                    }
                }
            }
            res.status(201).send({ message: "Ingredients create succeeded" });
        } catch (error) {
            res.status(500).send({ message: "Error creating ingredients", error });
        }
    },
    async deleteAllIngredients(req, res) {
        try {
            await Ingredient.deleteMany();
            await Recipe.updateMany({}, { $set: { incidenceIds: [] } });
            await User.updateMany({}, { $set: { incidenceIds: [] } });
            res.send({ message: "Ingredients delete succeeded" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error deleting Ingredients" });
        }
    },
    async deleteAllRecipes(req, res) {
        try {
            await Recipe.deleteMany();
            await Ingredient.updateMany({}, { $pull: { recipeIds: [] } });
            await User.updateMany({}, { $set: { recipeIds: [] } });
            res.send({ message: "Recipes delete all succeeded" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error deleting Recipes" });
        }
    },
}
module.exports = AdminController;
