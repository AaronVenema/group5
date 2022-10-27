const router = require('express').Router();
const { Bill, User, Category } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const BillData = await Bill.findByPk(req.params.id, {
            include: [{ model: User }, { model: Category }],
        });

        if (!BillData) {
            res.status(404).json({ message: 'No category bill with that id!' });
            return;
        }

        res.status(200).json(BillData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const BillData = await Bill.create(req.body);

        res.status(200).json(BillData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const BillData = await Bill.update({
            category_name: req.body.category_name
        }, {
            where: {
                id: req.params.id
            }
        })

        if (!BillData[0]) {
            res.status(404).json({ message: "Not valid Bill!" });
        }

        res.status(200).json(BillData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const BillData = await Bill.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!BillData) {
            res.status(404).json({ message: 'No bill found with that id!' });
            return;
        }

        res.status(200).json(billData);
    } catch (err) {
        res.status(500).json(err);
    }
});