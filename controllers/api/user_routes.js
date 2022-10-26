const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { tableName } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      include: [ {model: Product} ],
      });

    res.status(200).json(TagData);
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id,{
      through: [{model: ProductTag}],
    });

    if (!TagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
})
  


router.post('/', async (req, res) => {
  try {
    const TagData = await Tag.create(req.body);

    res.status(200).json(TagData);
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
