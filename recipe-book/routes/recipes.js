const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');
	
router.get('/recipe', recipesCtrl.index);

router.get('/new', recipesCtrl.new);
router.post('/recipes/addRecipe', recipesCtrl.addRecipe);

//router.get('/:id', recipesCtrl.show);


	
module.exports = router;
