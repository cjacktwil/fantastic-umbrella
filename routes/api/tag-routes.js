const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//Get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
    {
    model: Product,
    through: ProductTag,
    as: 'product_tags',
    attributes: ['id', 'product_name', 'price', 'stock']
  }]
})
.then(dbTagData => res.json(dbTagData))
.catch(err => {
  if(err) {
    console.log(err);
    res.status(500).json(err);
  }
});
});

//Get one tag by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [{
        model: Product,
        through: ProductTag,
        as: 'product_tags',
        attributes: ['id', 'product_name', 'price', 'stock']
      }]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//Create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//Update the name of an existing tag
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag exists with that id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag exists with that id.'});
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

module.exports = router;
