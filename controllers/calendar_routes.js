const router = require('express').Router();

// 3001/dashboard

router.get('/', async (req, res) => {
    try {
        // Pass serialized data and session flag into template
        res.render('calendar',
        {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        }
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;