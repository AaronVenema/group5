const router = require('express').Router();
const categoryRoutes = require('./category_routes');
const incomeRoutes = require('./income_routes');
const billRoutes = require('./bill_routes');
const userRoutes = require('./user_routes');

router.use('/categories', categoryRoutes);
router.use('/income', incomeRoutes);
router.use('/bills', billRoutes);
router.use('/users', userRoutes);
module.exports = router;
