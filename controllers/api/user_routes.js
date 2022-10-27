const router = require('express').Router();
const { User } = require('../../models');
const { tableName } = require('../../models/Product');

// The `/api/user` endpoint

// Send back user data
router.get('/:id', async (req, res) => {
  try {
  const userData = await User.findByPk(req.params.id)
  res.json(userData)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    // req.body: {
    //   "name": "username43",
    //   "password": "asdf6578ad67a6s9d87f"
    // }
    const newUser = await User.create(req.body);

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const TagData = await Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    })

    if (!TagData[0]) {
      res.status(404).json({message: "Not valid tag!"});
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
