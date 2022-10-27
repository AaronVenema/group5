const router = require('express').Router();
const { Bill, Income, User } = require('../../models');

// Might not need/want a getter for all users or might not want to pull all bills and incomes
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [ {model: Bill}, {model: Income} ],
      });

    res.status(200).json(userData);
  } catch (err){
    res.status(500).json(err)
  }
});

// Might not need/want a getter for users by ID or might not want to pull all bill and icomes
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

router.post("/login", async (req,res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: "You are now logged in!" });
    });

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

// Having the login and logout post routes would probably be better than just a generic post,
// but keep this one around for testing.
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userData = await Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    })

    if (!userData[0]) {
      res.status(404).json({message: "Not valid user!"});
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

module.exports = router;
