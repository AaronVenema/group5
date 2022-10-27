const router = require('express').Router();
const { User, Income } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const incomeData = await income.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        if (!incomeData) {
            res.status(404).json({ message: 'No income found with that id!' });
            return;
        }
        res.status(200).json(incomeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const incomeData = await Income.create(req.body);
        res.status(200).json(incomeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const incomeData = await Income.update({
            amount: req.body.amount
        },
            {
                where: {
                    id: req.params.id,
                }
            });

        if (!incomeData) {
            res.status(404).json({ message: 'No income found with that id!' });
            return;
        }
        res.status(200).json(incomeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const incomeData = await Income.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!incomeData) {
            res.status(404).json({ message: 'No product found with that id!' });
            return;
        }

        res.status(200).json(incomeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
