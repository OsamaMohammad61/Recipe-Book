const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviews')

router.get('/recipe/review', reviewCtrl.reviewForm)
router.post('/recipe/:id/addReview', reviewCtrl.addReview)
router.get('/reviews/allreviews', reviewCtrl.allReviews)
router.post('/review/:id', reviewCtrl.Onereview)
router.post('/edit/:id', reviewCtrl.edit)
router.put('/update/:id/review/:reviewid', reviewCtrl.update)
router.delete('/deleteit/:id', reviewCtrl.delete)

module.exports = router