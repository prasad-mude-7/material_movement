const express = require('express');
const router = express.Router();
const { getEmptyRack, storeMaterial } = require('../controllers/materialMovementController');

// GET 
// Query parameter: plant_id
router.get('/empty-rack', getEmptyRack);

// POST 
router.post('/store-material', storeMaterial);

module.exports = router;
