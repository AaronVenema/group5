const router = require('express').Router();
const apiRoutes = require('./api');
const calendarRoutes = require('./calendar_routes')
const homeRoutes = require('./homeRoute')
router.use('/api', apiRoutes);
router.use('/dashboard', calendarRoutes)
router.use(homeRoutes)
module.exports = router;