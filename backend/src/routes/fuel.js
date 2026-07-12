const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuelController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', authenticateToken, fuelController.getAll);
router.post('/', authenticateToken, fuelController.logFuel);

module.exports = router;
