const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', authenticateToken, tripsController.getTrips);
router.post('/', authenticateToken, tripsController.createTrip);

module.exports = router;
