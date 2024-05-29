const express = require('express')
const router = express.Router()

const recipesCtrl = require('../controllers/recipes')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/recipe', recipesCtrl.index)

router.get('/new', recipesCtrl.new)
router.post('/recipes/addRecipe', recipesCtrl.addRecipe)
router.get('/recipe/:id', ensureLoggedIn, recipesCtrl.showAllRecipes)
router.get('/cuisines', recipesCtrl.showCuisines)
router.get('/recipes/:id', recipesCtrl.show)
router.delete('/recipe/:id', recipesCtrl.delete);

module.exports = router
