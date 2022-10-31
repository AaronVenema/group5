const router = require('express').Router();

// HOME ROUTES
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    res.render('login');
  });

router.get('/signup', (req, res) => {
if (req.session.logged_in) {
    res.redirect('/signup');
    return;
}
res.render('signup');
});

// CALENDAR ROUTES

router.get('/', async (req, res) => {
    try {
        const billData = await Bill.findAll({
            attributes: [['name', 'title'], 'amount', ['date_str', 'start']]
        })
        const bills = billData.map(bill => bill.get({ plain: true }))
        const incomeData = await Income.findAll({
            attributes: [['name', 'title'], 'amount', ['date_str', 'start']]
        })
        const incomes = incomeData.map(income => income.get({ plain: true }))
        const events = [] 
        bills.forEach(bill => events.push(bill))
        incomes.forEach(income => events.push(income))
        // Pass serialized data and session flag into template
        res.render('calendar',
            {
                logged_in: req.session.logged_in,
                user_id: req.session.user_id,
                events: JSON.stringify(events)
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

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

// API

// USER ROUTES

router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id,{
        include: [{model: Bill}, {model: Income}],
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with that ID!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  
  router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  router.post("/login", async (req,res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: "Incorrect email, please try again." });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      console.log(`>>>validPassword is ${validPassword}`);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect password, please try again." });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: "You are now logged in!" });
      });
      res.sendStatus(200);
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post("/logout", async (req,res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const userData = await User.update(req.body,{
        where: {
          id: req.params.id
        }
      })
  
      if (!userData[0]) {
        res.status(404).json({message: "Not valid user!"});
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with that ID!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });