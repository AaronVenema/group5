const router = require('express').Router();
const { Category, User, Bill } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
    });
    
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
