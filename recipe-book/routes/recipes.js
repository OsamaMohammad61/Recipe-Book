const express = require('express')
const router = express.Router()

const recipesCtrl = require('../controllers/recipes')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/recipe', recipesCtrl.index)

router.get('/new', recipesCtrl.new)
<<<<<<< HEAD
router.post('recipe/:id/addReview', recipesCtrl.addRecipe)
router.get('/recipe/:id', recipesCtrl.showAllRecipes)
router.get('/cuisines', recipesCtrl.showCuisines)
router.get('/recipes/:id', recipesCtrl.show)
router.delete('/recipe/:id', recipesCtrl.delete);

=======
router.post('/recipes/addRecipe', recipesCtrl.addRecipe)
router.get('/recipe/:id', ensureLoggedIn, recipesCtrl.showAllRecipes)
router.get('/cuisines', recipesCtrl.showCuisines)
router.get('/recipes/:id', ensureLoggedIn, recipesCtrl.show)
router.get('/:id/edit', ensureLoggedIn, recipesCtrl.edit)
router.post('/edit/:id', ensureLoggedIn, recipesCtrl.update)
router.delete('/recipe/:id', ensureLoggedIn, recipesCtrl.delete)
>>>>>>> 83a770744f76de74ae063a7a324622c75c535b83

module.exports = router
