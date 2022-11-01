const router = require('express').Router();

// HOME ROUTES
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// CALENDAR ROUTES

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
          exp += bill.amount
          events.push(bill)
      })
      incomes.forEach(income => {
          income.backgroundColor = '#55c937'
          income.type = 'income'
          inc += income.amount
          events.push(income)
      })
      const username = 'Jon'
      let disposableIncome = inc - exp
      // Pass serialized data and session flag into template
      res.render('calendar',
          {
              layout: 'dashboard',
              logged_in: req.session.logged_in,
              username,
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

// API

// USER ROUTES
router.post('/api/users/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    }
    )
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post("/api/users/login", async (req,res) => {
  console.log('hit')
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email, please try again." });
      return;
    }
    const user = userData.get({plain:true})
    console.log(user)

    const validPassword = await user.checkPassword(req.body.password);
    console.log(`>>>validPassword is ${validPassword}`);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
    });

    res.status(200).json({ user, message: "You are now logged in!" });;

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/api/users/logout", async (req,res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// BILL ROUTES

router.post('/api/bills/', async (req, res) => {
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

// CATEGORY ROUTES
router.get('/api/categories/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
    });
    
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// INCOMES

router.post('/api/incomes/', async (req, res) => {
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