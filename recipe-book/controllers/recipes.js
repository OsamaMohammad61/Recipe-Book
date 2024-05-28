const Recipe = require('../models/recipe')
const Review = require('../models/review')
const User = require('../models/user')

module.exports = {
  index,
  show,
  new: newRecipe,
  addRecipe,
  showCuisines,
  showAllRecipes,
  delete: deleteRecipe,
  edit: editRecipe,
  update
}

async function index(req, res) {
  //const recipes = await Recipe.find({});
  res.render('recipes/index', { title: 'All Recipes' })
}

async function show(req, res) {
  const recipe = await Recipe.findById(req.params.id).populate('reviewon')

  res.render('recipes/show', { title: 'Recipe Detail', recipe })
}

async function newRecipe(req, res) {
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

    const getUser = await User.findById(person)
    if (getUser) {
      getUser.recipeadd.push(recipe._id)
      await getUser.save()
    }
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
    console.error(err) // Corrected error logging
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

async function deleteRecipe(req, res) {
  let recipeID = req.params.id
  // Note the cool "dot" syntax to query on the property of a subdoc
  const recipe = await Recipe.find({})
  // Rogue user!
  if (!recipe) return res.render('recipes/index', { title: 'All Recipes' })
  // Remove the review using the remove method available on Mongoose arrays
  recipe.forEach((r) => {
    if (r._id === recipeID) {
      r.remove()
    }
  })
  recipe.remove()
  // Save the updated recipes doc
  await recipe.save()
  // Redirect back to the recipes's show view
  res.render('recipes/index', { title: 'All Recipes' })
}

async function deleteRecipe(req, res) {
  try {
    const getRecipe = await Recipe.findByIdAndDelete(req.params.id)
    res.redirect('/cuisines')
  } catch (err) {
    console.error(err)
  }
}
async function editRecipe(req, res) {
  console.log(req.params.id)
  const recipe = await Recipe.findById(req.params.id)
  console.log(recipe)
  res.render('recipes/edit', {
    recipe
  })
}
async function update(req, res) {
  const recipetId = req.params.id
  const updatedrecipe = req.body
  console.log(updatedrecipe)
  await Recipe.findByIdAndUpdate(recipetId, updatedrecipe)
  res.redirect(`/recipes/${recipetId}`)
}
