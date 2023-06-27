const router = require('express').Router();
const { Transaction, User, Objective } = require('../../Models');
const withAuth = require('../../utils/auth');
const mailer = require('../../utils/libs/emailer');


// POST ROUTE - mandatory to have the id in the url
router.post('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.body);
        const transactionData = await Transaction.create(
            {
                ...req.body,
                user_id: req.session.user_id,
                objective_id: req.params.id,
            }
        );

        if (!transactionData) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        const data = transactionData.get({ plain: true });

        const userData = await User.findOne({ where: { id: data.user_id } });
        const objData = await Objective.findOne({ where: { id: req.params.id } });

        const email = userData.get({ plain: true }).email;
        const goal = objData.get({ plain: true }).name;

        const NotificationJson = {
            email: email,
            quantity: req.body.quantity,
            goal: goal
        }

        mailer.SendNotification(NotificationJson);

        res.status(200).json(transactionData);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed', error: err.message });
    }
});

// PUT ROUTE
router.put('/:id', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.update(

            req.body, { where: { id: req.params.id, user_id: req.session.user_id } }

        );
        if (!transactionData) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE ROUTE
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.destroy(
            {
                where: { id: req.params.id, user_id: req.session.user_id }
            }
        );
        if (!transactionData) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;