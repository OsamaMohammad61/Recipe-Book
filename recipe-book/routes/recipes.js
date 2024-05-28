const express = require('express')
const router = express.Router()

const recipesCtrl = require('../controllers/recipes')

router.get('/recipe', recipesCtrl.index)

router.get('/new', recipesCtrl.new)
router.post('recipe/:id/addReview', recipesCtrl.addRecipe)
router.get('/recipe/:id', recipesCtrl.showAllRecipes)
router.get('/cuisines', recipesCtrl.showCuisines)
router.get('/recipes/:id', recipesCtrl.show)
router.delete('/recipe/:id', recipesCtrl.delete);


module.exports = router
