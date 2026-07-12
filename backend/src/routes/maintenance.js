const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/', authenticateToken, maintenanceController.logMaintenance);
router.get('/', authenticateToken, maintenanceController.getAll);

module.exports = router;
