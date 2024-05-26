const express = require('express');
const router = express.Router();

const cuisinesCtrl = require('../controllers/cuisines');
	
router.get('/cuisine', cuisinesCtrl.index);


	
module.exports = router;