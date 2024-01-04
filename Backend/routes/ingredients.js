const express = require("express");
const router = express.Router();
const IngredientController = require("../controllers/IngredientController");

const {
  authentication,
  isAdmin,
  isSuperAdmin,
  isPostAuthor,
} = require("../middleware/authentication");
// const upload = require("../middleware/upload");

router.post("/",
  authentication,
  // upload.single("image"),
  IngredientController.create);
router.put("/:_id", authentication, IngredientController.update);
router.delete("/:_id", authentication, IngredientController.delete);
router.get("/", IngredientController.getAll);
router.get("/id/:_id", IngredientController.getById);
router.get("/name/:product", IngredientController.getByName);
// router.put("/like/:_id", authentication, IngredientController.like);
// router.put("/unlike/:_id", authentication, IngredientController.unlike);

module.exports = router;
