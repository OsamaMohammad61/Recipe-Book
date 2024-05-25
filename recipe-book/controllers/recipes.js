const Recipe = require('../models/recipe');
const Review = require('../models/reviews');

module.exports = {
index,
show,
new: newRecipe,
create
};

async function index(req, res) {
const recipes = await Recipe.find({});
res.render('recipes/index', { title: 'All Recipes', recipes });
}

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

function newRecipe(req, res) {
// We'll want to be able to render an  
// errorMsg if the create action fails
res.render('recipes/new', { title: 'Add Recipe', errorMsg: '' });
}

async function create(req, res) {

    req.body.nowShowing = !!req.body.nowShowing;

for (let key in req.body) {
if (req.body[key] === '') delete req.body[key];
}
try {
const recipe = await Recipe.create(req.body);

res.redirect(`/recipes/${recipe._id}`);  
} catch (err) {
console.log(err);
res.render('recipes/new', { errorMsg: err.message });
}
}