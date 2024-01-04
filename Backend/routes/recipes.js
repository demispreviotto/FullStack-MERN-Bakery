const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/RecipeController");

const {
  authentication,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/authentication");
// const upload = require("../middleware/upload");

router.post("/",
  authentication,
  // upload.single("image"),
  RecipeController.create);
router.put("/:_id", authentication, RecipeController.update);
router.delete("/:_id", authentication, RecipeController.delete);
router.get("/", RecipeController.getAll);
router.get("/:_id", RecipeController.getById);

module.exports = router;
