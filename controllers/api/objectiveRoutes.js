const router = require('express').Router();
const { Objective } = require('../../Models');

router.get('/', async (req, res) => {
    try {
        const objectiveData = await Objective.findByPk(req.params.id);
        const objective = objectiveData.get({ plain: true });
        res.render('objective', objective);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        res.status(200).json('request post');
    } catch (err) {
        res.status(400).json(err);
    }
});
router.put('/:id', async (req, res) => {
    try {
        res.status(200).json('request put');
    } catch (err) {
        res.status(400).json(err);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        res.status(200).json('request delete');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;