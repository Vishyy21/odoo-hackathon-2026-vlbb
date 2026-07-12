const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', authenticateToken, vehiclesController.getVehicles);

module.exports = router;
