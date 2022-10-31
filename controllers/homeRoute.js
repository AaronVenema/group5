const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

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

module.exports = router;