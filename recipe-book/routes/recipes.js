const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');
	
router.get('/', recipesCtrl.index);

router.get('/new', recipesCtrl.new);

router.get('/:id', recipesCtrl.show);

router.post('/', recipesCtrl.create);
	
module.exports = router;
