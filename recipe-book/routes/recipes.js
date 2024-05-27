const express = require('express')
const router = express.Router()

const recipesCtrl = require('../controllers/recipes')

router.get('/recipe', recipesCtrl.index)

router.get('/new', recipesCtrl.new)
router.post('/recipes/addRecipe', recipesCtrl.addRecipe)
router.get('/recipe/:id', recipesCtrl.showAllRecipes)
//router.get('/allrecipes', recipesCtrl.showAll)
router.get('/cuisines', recipesCtrl.showCuisines)
router.get('/recipes/:id', recipesCtrl.show)
router.get('/:id/edit', recipesCtrl.edit)
router.post('/edit/:id', recipesCtrl.update)
router.delete('/recipe/:id', recipesCtrl.delete)

module.exports = router
