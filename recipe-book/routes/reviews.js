const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviews')

router.get('/recipe/review', reviewCtrl.reviewForm)
router.post('/recipe/:id/addReview', reviewCtrl.addReview)

router.get('/recipes/allreviews', reviewCtrl.allReviews)
router.get('/review/:id', reviewCtrl.Onereview)

module.exports = router
