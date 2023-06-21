const router = require('express').Router();
const { Transaction } = require('../../Models');

router.post('/', async (req, res) => {
    try {
        const transactionData = await Transaction.create(
            {
                ...req.body, user_id: req.session.user_id
            }
        );
        !transactionData[0] ? res.status(404).json({ message: 'Objective not found' }) :
            res.status(200).json(transactionData);
    } catch (err) {
        res.status(400).json(err);
    }
});
router.put('/:id', async (req, res) => {
    try {
        const transactionData = await Transaction.update(

            req.body, { where: { id: req.params.id, user_id: req.session.user_id } }

        );
        !transactionData[0] ? res.status(404).json({ message: 'Objective not found' }) :
            res.status(200).json(transactionData);
    } catch (err) {
        res.status(400).json(err);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const transactionData = await Transaction.destroy(
            {
                where: { id: req.params.id, user_id: req.session.user_id }
            }
        );
        !transactionData[0] ? res.status(404).json({ message: 'Objective not found' }) :
            res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;