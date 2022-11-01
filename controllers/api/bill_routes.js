const router = require('express').Router();
const { Bill, User, Category } = require('../../models');

// /api/bills

router.post('/', async (req, res) => {
    try {
        const categoryId = await Category.findOne({where:{name:req.body.category},attributes:['id']})
        req.body.category_id = categoryId.dataValues.id
        req.body.user_id = req.session.user_id
        console.log(req.body)
        const BillData = await Bill.create(req.body);
        res.status(200).json(BillData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;