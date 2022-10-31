const router = require('express').Router();
const apiRoutes = require('./api');

// render login form

router.use('/', require('./home'))
router.use('/api', apiRoutes);
router.use('/dashboard', require('./calendar_routes'))

module.exports = router;