const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Bill, Income, User } = require('../../models');

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

module.exports = router;
