const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/', authenticateToken, maintenanceController.logMaintenance);

module.exports = router;
