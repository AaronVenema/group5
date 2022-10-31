const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use(require('./calendar_routes'))
router.use(require('./homeRoute'))
module.exports = router;