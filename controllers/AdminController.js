require("dotenv").config();
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const jwt_secret = process.env.JWT_SECRET;
// const recipesData = require('../data/recipesData_en.json')
const fs = require('fs');

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
    async organizeRecipes(req, res) {
        try {
            const recipesDataJson = require("../data/recipesData.json");
            const organizedRecipes = {};
            recipesDataJson.forEach((recipe) => {
                const recipeName = recipe.recipeName.toLowerCase();
                if (!organizedRecipes[recipeName]) {
                    organizedRecipes[recipeName] = [];
                }
                const organizedRecipe = { ...recipe };
                delete organizedRecipe.recipeName;
                organizedRecipes[recipeName].push(organizedRecipe);
            });
            res.status(300).send({ message: "Organized Recipes: ", organizedRecipes });
        } catch (error) {
            res.status(500).send({ message: "Something went wrong ", error });
        }
    },
    async updateRecipesWithIngredientIds(req, res) {
        try {
            // Load recipes from JSON file
            const recipesData = require('../data/recipesData_en.json');
            const newIngredients = [];

            for (const recipeObj of recipesData) {
                const recipeName = Object.keys(recipeObj)[0];
                const ingredients = recipeObj[recipeName];

                const ingredientIds = [];
                for (const ingredient of ingredients) {
                    const { ingredientName } = ingredient;
                    let foundIngredient = await Ingredient.findOne({ ingredientName });

                    if (!foundIngredient) {
                        // Push the ingredient name into the newIngredients array
                        newIngredients.push(ingredientName);
                    } else {
                        // Push the ID of the found ingredient
                        ingredientIds.push(foundIngredient._id);
                    }
                }

                // Update the recipe object in the JSON file
                recipeObj.ingredients = ingredientIds;

                console.log(`Recipe "${recipeName}" updated successfully.`);
            }

            // Save the updated recipes back to the JSON file
            fs.writeFileSync('./recipesData.json', JSON.stringify(recipesData, null, 2));

            res.status(200).json({ message: 'Recipes updated successfully.', newIngredients });
        } catch (error) {
            console.error('Error updating recipes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async updateIngredientsToLowercase() {
        try {
            const ingredientData = fs.readFileSync('../data/ingredientsData.json');
            const ingredients = JSON.parse(ingredientData);

            // Iterate through each ingredient and update string fields to lowercase
            for (const ingredient of ingredients) {
                // Update ingredientName
                ingredient.ingredientName = ingredient.ingredientName.toLowerCase();
                // Update other string fields to lowercase
                ingredient.type = ingredient.type.toLowerCase();
                ingredient.provider = ingredient.provider.toLowerCase();
                ingredient.brand = ingredient.brand.toLowerCase();
                ingredient.note = ingredient.note.toLowerCase(); // If note is a string field
            }

            // Write the updated ingredient data back to the JSON file
            fs.writeFileSync('ingredientData.json', JSON.stringify(ingredients, null, 2));

            console.log('All string fields in ingredientData.json updated to lowercase.');
        } catch (error) {
            console.error('Error updating ingredients to lowercase:', error);
        }
    }
}
module.exports = AdminController;
