const router = require('express').Router();
const { Category, Bill, Income, User } = require('../models')
const withAuth = require('../utils/auth')
// 3001/dashboard

// Render calendar
router.get('/', async (req, res) => {
    console.log(req.session)
    try {
        const billData = await Bill.findAll({
            where: {user_id:req.session.user_id},
            attributes: [['name', 'title'], 'amount', ['date_str', 'start']]
        })
        const bills = billData.map(bill => bill.get({ plain: true }))
        const incomeData = await Income.findAll({
            where: {user_id:req.session.user_id},
            attributes: [['name', 'title'], 'amount', ['date_str', 'start']]
        })
        const incomes = incomeData.map(income => income.get({ plain: true }))
        const events = [] 
        let exp = 0
        let inc = 0
        bills.forEach(bill => {
            bill.backgroundColor = '#f78d46'
            bill.type = 'bill'
            exp += parseFloat(bill.amount)
            events.push(bill)
        })
        incomes.forEach(income => {
            income.backgroundColor = '#55c937'
            income.type = 'income'
            inc += parseFloat(income.amount)
            events.push(income)
        })
        const usernameData = await User.findByPk(req.session.user_id)
        const username = usernameData.get({plain:true})
        console.log(username)

        let disposableIncome = inc - exp
        // Pass serialized data and session flag into template
        res.render('calendar',
            {
                layout: 'dashboard',
                logged_in: req.session.logged_in,
                username: username.name,
                disposableIncome,
                user_id: req.session.user_id,
                events: JSON.stringify(events)
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render form to add income or expense
router.get('/event/:date', async (req, res) => {
    try {
        const categoryData = await Category.findAll()
        const categories = categoryData.map(c => c.get({ plain: true }))
        console.log(categories, req.params.date)
        res.render('event', {
            categories,
            dateStr: req.params.date
        })
        return
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;