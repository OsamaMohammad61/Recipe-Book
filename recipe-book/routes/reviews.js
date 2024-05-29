const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviews')

router.get('/recipe/review', reviewCtrl.reviewForm)
router.post('/recipe/:id/addReview', reviewCtrl.addReview)
router.get('/recipes/allreviews', reviewCtrl.allReviews)
router.post('/review/:id', reviewCtrl.Onereview)
router.get('/edit/:id', reviewCtrl.edit)
router.put('/update/:id/review', reviewCtrl.update)
router.delete('/deleteit/:id', reviewCtrl.delete)

module.exports = router
