const router = require('express').Router();
const { User, Transaction, Objective } = require('../Models');


router.get('/user', async (req, res) => {
    try {
        const data = await User.findAll({
            include: [{ model: Objective, include: { model: Transaction } }]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;