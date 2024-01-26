const express = require("express");
const router = express.Router();
const IngredientController = require("../controllers/IngredientController");

const { authentication } = require("../middleware/authentication");

router.post("/", authentication, IngredientController.create);
router.put("/:_id", authentication, IngredientController.update);
router.delete("/:_id", authentication, IngredientController.delete);
router.get("/", IngredientController.getAll);
router.get("/id/:_id", authentication, IngredientController.getById);
router.get("/name/:product", authentication, IngredientController.getByName);

module.exports = router;
