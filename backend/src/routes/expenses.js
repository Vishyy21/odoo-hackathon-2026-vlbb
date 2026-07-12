const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', authenticateToken, expenseController.getAll);
router.post('/', authenticateToken, expenseController.logExpense);

module.exports = router;
