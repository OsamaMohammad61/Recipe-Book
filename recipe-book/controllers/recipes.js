const Recipe = require('../models/recipe')
const Review = require('../models/review')

module.exports = {
  index,
  show,
  new: newRecipe,
  addRecipe,
  showCuisines,
  showAllRecipes
}

async function index(req, res) {
  //const recipes = await Recipe.find({});
  res.render('recipes/index', { title: 'All Recipes' })
}

async function show(req, res) {
  const recipe = await Recipe.findById(req.params.id)

  res.render('recipes/show', { title: 'Recipe Detail', recipe })
}

function newRecipe(req, res) {
  // We'll want to be able to render an
  // errorMsg if the create action fails
  res.render('recipes/new', { title: 'Add Recipe' })
}

async function addRecipe(req, res) {
  let person = req.user._id
  try {
    const recipe = await new Recipe(req.body)
    recipe.doneBY.push(person)
    await recipe.save()

    res.render('recipes/show', { title: 'Add Recipe', recipe })
  } catch (err) {
    console.log(err)
    res.render('recipes/index', { errorMsg: err.message })
  }
}

async function showAllRecipes(req, res) {
  let getID = req.params.id
  try {
    let getCuisine = await Recipe.findById(getID)
    let allRecipes = await Recipe.find({ cuisine: getCuisine.cuisine })
    res.render('recipes/allrecipes', { title: 'All Recipes', allRecipes })
  } catch (err) {
    console.error(error)
  }
}

async function showCuisines(req, res) {
  try {
    let allCusines = await Recipe.find({})
    const filteredRecipes = allCusines.reduce((uniqueCuisines, recipe) => {
      const cuisine = recipe.cuisine
      const existingCuisine = uniqueCuisines.find(
        (item) => item.cuisine === cuisine
      )

      if (!existingCuisine) {
        uniqueCuisines.push({ cuisine: recipe.cuisine, id: recipe._id })
      }

      return uniqueCuisines
    }, [])

    res.render('recipes/cuisines', { title: 'All Cuisines', filteredRecipes })
  } catch (error) {
    console.error(error)
  }
}
