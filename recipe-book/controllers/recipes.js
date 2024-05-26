const Recipe = require('../models/recipe');
const Review = require('../models/review');

module.exports = {
index,
//show,
new: newRecipe,
addRecipe
};

async function index(req, res) {
//const recipes = await Recipe.find({});
res.render('recipes/index', { title: 'All Recipes' });
}
/*

async function show(req, res) {
const recipe = await Recipe.findById(req.params.id).populate('');//?
const reviews = await review.find({});
const recipeCast = recipe.cast;

const castNames = recipeCast.map((castMember) => castMember.name);

const availableReviews = reviews.filter((review)=> {
console.log(typeof review._id)
if(!castNames.includes(review.name)) {
    return review;
}
})
res.render('recipes/show', { title: 'Recipe Detail', recipe, availableReviews });
}
*/
function newRecipe(req, res) {
// We'll want to be able to render an  
// errorMsg if the create action fails
res.render('recipes/new', { title: 'Add Recipe'});
}

async function addRecipe(req, res) {
try {
const recipe = await new Recipe(req.body);

await recipe.save()

res.render('recipes/show', { title: 'Add Recipe', recipe});
} catch (err) {
console.log(err);
res.render('recipes/index', { errorMsg: err.message });
}
}