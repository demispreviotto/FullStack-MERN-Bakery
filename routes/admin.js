const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/createIngredientsFromJson", authentication, isAdmin, AdminController.createIngredientsFromJson);
router.delete("/deleteAllIngredients", authentication, isAdmin, AdminController.deleteAllIngredients);
router.delete("/deleteAllRecipes", authentication, isAdmin, AdminController.deleteAllRecipes);
router.post("/organizeRecipes", AdminController.organizeRecipes);
router.post("/updateRecipesWithIngredientIds", AdminController.updateRecipesWithIngredientIds);
router.post("/updateIngredientsToLowercase", AdminController.updateIngredientsToLowercase);

module.exports = router;
