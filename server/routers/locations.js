const express = require('express');
const router = express.Router();
const { saveLocation, unsaveLocation } = require('../controllers/locationController');
const { verifyTokenandAuthorization, verifyToken } = require('../token/verifyToken');

// SAVE Locations
router.put('/save',verifyToken, saveLocation);

// UNSAVE Locations
router.put('/unsave', verifyToken, unsaveLocation);

module.exports = router;