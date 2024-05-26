const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

// Uncomment or add the routes you need
// router.get('/', recipeController.index);
// router.get('/new', recipeController.newRecipe);
// router.post('/', recipeController.addRecipe);
router.get('/cuisines', recipeController.cuisines);

module.exports = router;
