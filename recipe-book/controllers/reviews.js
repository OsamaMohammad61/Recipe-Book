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
    console.log(req.body)
    const newreview = new review(req.body)
    newreview.username = byUser
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
  const findIt = await review.findById(req.params.id)
  res.render('recipes/reviewForm', { title: 'Enter Review', findIt })
}

const update = async(req, res) =>{
  const chReview = req.params.id
  try{
    const editReview = await review.findById(chReview)

    if (!editReview){
      console.log("Review not found")
      res.redirect('/new')
    }
    editReview.heading = req.body.heading
    editReview.detail = req.body.detail
    editReview.rate = req.body.rate
  }
}
module.exports = { reviewForm, addReview, allReviews, Onereview }
