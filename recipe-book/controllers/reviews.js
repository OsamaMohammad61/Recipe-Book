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
    console.log('reviewOn', reviewOn)
    console.log('req.body', JSON.stringify(req.body, null, 2))
    console.log('byUser', byUser)
    const newreview = new Review(req.body)
    console.log('new review done')
    newreview.username = byUser
    await newreview.save()
    console.log(`Fetching user ${byUser}`)
    const getuser = await User.findById(byUser)
    console.log(`Done Fetching user ${getuser}`)
    if (getuser) {
      console.log('inside getuser')

      getuser.reviews.push(newreview._id)
      console.log('after push')

      await getuser.save()
      console.log('after save')
    }
    const getrecipe = await Recipe.findById(reviewOn)
    console.log('getrecipe', getrecipe)

    if (getrecipe) {
      getrecipe.reviewon.push(newreview._id)
      console.log('reviewon push')
      await getrecipe.save()
      console.log('after save')
    }

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
  const findIt = await Review.findById(req.params.id)
  res.render('recipes/reviewForm', { title: 'Enter Review', findIt })
}
/*
const update = async (req, res) => {
  const chReview = req.params.id
  try {
    const editReview = await review.findById(chReview)

    if (!editReview) {
      console.log('Review not found')
      res.redirect('/new')
    }
    editReview.heading = req.body.heading
    editReview.detail = req.body.detail
    editReview.rate = req.body.rate
  } catch (err) {
    console.error(err)
  }
}
*/
module.exports = { reviewForm, addReview, allReviews, Onereview }
