const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dasboardRoutes = require('./dasboardRoutes.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dasboardRoutes);

module.exports = router;