const express = require('express')
const router = express.Router()

const recipesCtrl = require('../controllers/recipes')

router.get('/recipe', recipesCtrl.index)

router.get('/new', recipesCtrl.new)
router.post('/recipes/addRecipe', recipesCtrl.addRecipe)

//router.get('/allrecipes', recipesCtrl.showAll)
router.get('/cuisines', recipesCtrl.showCuisines)

module.exports = router
