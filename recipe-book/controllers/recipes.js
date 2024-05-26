const Recipe = require('../models/recipe');
const Review = require('../models/review');
const Cuisines = require('../models/cuisines');

async function index(req, res) {
    try {
        const recipes = await Recipe.find({});
        res.render('recipes/index', { title: 'All Recipes', recipes });
    } catch (err) {
        console.log(err);
        res.render('recipes/index', { errorMsg: err.message });
    }
}

/* Commented out the `show` function as it is not currently used
async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id).populate('');
    const reviews = await Review.find({});
    const recipeCast = recipe.cast;

    const castNames = recipeCast.map((castMember) => castMember.name);

    const availableReviews = reviews.filter((review) => {
        console.log(typeof review._id);
        if (!castNames.includes(review.name)) {
            return review;
        }
    });
    res.render('recipes/show', { title: 'Recipe Detail', recipe, availableReviews });
}
*/

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add Recipe' });
}

async function addRecipe(req, res) {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.render('recipes/show', { title: 'Add Recipe', recipe });
    } catch (err) {
        console.log(err);
        res.render('recipes/index', { errorMsg: err.message });
    }
}

async function getAllRecipes(req, res) {
    try {
        const recipes = await Recipe.find({});
        res.send(recipes); // Adjust this line to match how you want to send the recipes
    } catch (err) {
        console.log(err);
        res.status(500).send({ errorMsg: err.message });
    }
}

async function cuisines(req, res) {
    try {
        const cuisines = await Cuisines.find({});
        res.render('cuisines/index', { title: 'Cuisines', cuisines });
    } catch (err) {
        console.log(err);
        res.status(500).send({ errorMsg: err.message });
    }
}

module.exports = {
    index,
    new: newRecipe,
    addRecipe,
    getAllRecipes,
    cuisines // Ensure this is correctly exported
};
