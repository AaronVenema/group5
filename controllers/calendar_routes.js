const router = require('express').Router();
const { Category } = require('../models')
// 3001/dashboard

router.get('/', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('home');
      return;
    }
    res.render('home');
  });


// router.get('/', async (req, res) => {
//     try {
//         // Pass serialized data and session flag into template
//         res.render('calendar',
//             {
//                 logged_in: req.session.logged_in,
//                 user_id: req.session.user_id
//             }
//         );
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// save date to req.session
router.post('/event', (req, res) => {
    console.log('found')
    req.session.save(() => {
        req.session.dateStr = req.body.dateStr
    })

    res.redirect('/event')
})

// render forms
router.get('/event', async (req, res) => {
    const categoryData = await Category.findAll()
    const categories = categoryData.map(c => c.get({ plain: true }))
    res.render('event', {
        categories: categories,
        // dateStr: req.session.dateStr
    })
})



module.exports = router;