/* const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router; */
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const objectiveRoutes = require('./objectiveRoutes');
const transactionsRoutes = require('./transactionsRoutes');

router.use('/users', userRoutes);
router.use('/objectives', objectiveRoutes);
router.use('/transactions', transactionsRoutes);

module.exports = router;
