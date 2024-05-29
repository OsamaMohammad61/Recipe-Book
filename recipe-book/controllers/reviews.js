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
    newreview.recipeID.push(reviewOn)
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
  const hiddenID = req.body.recipeId

  const findIt = await Review.findById(req.params.id)
  res.render('recipes/reviewForm', { title: 'Enter Review', findIt, hiddenID })
}

const update = async (req, res) => {
  const chReview = req.params.id
  const goBack = req.params.reviewid
  console.log(goBack)
  const updatedReview = req.body
  try {
    const editReview = await Review.findByIdAndUpdate(chReview, updatedReview)

    if (!editReview) {
      console.log('Review not found')
    }
    res.redirect(`/recipes/${goBack}`)
  } catch (err) {
    console.error(err)
  }
}
const edit = async (req, res) => {
  const getReview = await Review.findById(req.params.id)
  const editRecipeId = req.body.editpass
  console.log(editRecipeId)
  res.render('recipes/editReviews', {
    title: 'Edit Review',
    getReview,
    editRecipeId
  })
}
const deleteReview = async (req, res) => {
  try {
    gotIt = req.body.repass
    console.log(req.body.repass)
    const deletethis = await Review.findByIdAndDelete(req.params.id)

    res.redirect(`/recipes/${gotIt}`)
  } catch (err) {
    console.error(err)
  }
}
module.exports = {
  reviewForm,
  addReview,
  allReviews,
  Onereview,
  update,
  edit,
  delete: deleteReview
}
