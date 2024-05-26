const User = require('../models/user')
const review = require('../models/review')

const reviewForm = (req, res) => {
  res.render('recipes/reviewForm', { title: 'Review Form' })
}
const addReview = async (req, res) => {
  try {
    let byUser = req.user._id
    console.log(req.body)
    const newreview = new review(req.body)
    newreview.username = byUser
    await newreview.save()

    const getuser = await User.findById(byUser)
    if (getuser) {
      getuser.reviews.push(newreview._id)
      await getuser.save()
    }
    console.log(getuser)
    console.log(newreview)

    res.render('recipes/reviewForm', { title: 'Review Forem' })
  } catch (err) {
    console.error('Pls log in')
  }
}

const allReviews = async (req, res) => {
  const userReviews = await User.findById(req.user._id).populate('reviews')

  res.render('recipes/allreviews', { title: 'All Reviews', userReviews })
}

module.exports = { reviewForm, addReview, allReviews }
