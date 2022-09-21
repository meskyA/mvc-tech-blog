const router = require('express').Router();

const apiRoutes = require('./controllers/api');
const homeRoutes = require('./controllers/homeRoutes.js');
const dashboardRoutes = require('./controllers/dashboardRoutes.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;