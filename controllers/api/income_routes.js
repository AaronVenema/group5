const router = require('express').Router();
const { User, Income } = require('../../models');

router.post('/', async (req, res) => {
    try {
        // req.body: {
            // name
            // amount
            // dateStr
        // }
        req.body.user_id = req.session.user_id
        const incomeData = await Income.create(req.body);
        res.status(200).json(incomeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
