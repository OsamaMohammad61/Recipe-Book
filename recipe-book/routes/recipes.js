const express = require('express')
const router = express.Router()
const recipesCtrl= require('../models/recipe')


router.get('/recipe', recipesCtrl.index)

router.get('/new', recipesCtrl.new)
router.post('/recipes/addRecipe', recipesCtrl.addRecipe)
//router.get('/recipe/:id', recipesCtrl.showAllRecipes)
//router.get('/allrecipes', recipesCtrl.showAll)
router.get('/cuisines', recipesCtrl.showCuisines)
router.get('/recipes/:id', recipesCtrl.show)

module.exports = router
