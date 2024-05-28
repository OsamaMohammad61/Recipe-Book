const User = require('../models/user')
const Review = require('../models/review')
const Recipe = require('../models/recipe')

const reviewForm = (req, res) => {
  res.render('recipes/reviewForm', { title: 'Enter Review' })
}
const addReview = async (req, res) => {
  try {
    let byUser = req.user._id
    let reviewOn = req.params.id
    console.log(reviewOn)

    const newreview = new Review(req.body)
    newreview.username = byUser
    newreview.recipeID.push(reviewOn)
    await newreview.save()

    const getuser = await User.findById(byUser)
    if (getuser) {
      getuser.reviews.push(newreview._id)
      await getuser.save()
    }
    const getrecipe = await Recipe.findById(reviewOn)
    if (getrecipe) {
      getrecipe.reviewon.push(newreview._id)
      await getrecipe.save()
    }
    console.log(getuser)
    console.log(newreview)
    console.log(getrecipe)

    res.redirect(`/recipes/${getrecipe._id}`)
  } catch (err) {
    console.error('Pls log in')
  }
}

const allReviews = async (req, res) => {
  const userReviews = await User.findById(req.user._id).populate('reviews')

  res.render('recipes/allreviews', { title: 'All Reviews', userReviews })
}

const Onereview = async (req, res) => {
  //   const findIt = await Review.findById(req.params.id)
  //   res.render('recipes/reviewForm', { title: 'Enter Review', findIt })
  // }

  try {
    const findIt = await Review.findById(req.params.id)
    if (!findIt) {
      return res.status(404).send('Review not found')
    }
    res.render('recipes/reviewForm', { findIt })
  } catch (err) {
    console.error(err)
    res.redirect('/recipes')
  }
}

module.exports = { reviewForm, addReview, allReviews, Onereview }
