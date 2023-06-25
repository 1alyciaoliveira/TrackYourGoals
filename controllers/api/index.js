const router = require('express').Router();
const userRoutes = require('./userRoutes');
const objectiveRoutes = require('./objectiveRoutes');
const transactionsRoutes = require('./transactionsRoutes');
const verificationRoutes = require('./verificationRoutes')

router.use('/user', userRoutes);
router.use('/objective', objectiveRoutes);
router.use('/transaction', transactionsRoutes);
router.use('/verification', verificationRoutes);

module.exports = router;
