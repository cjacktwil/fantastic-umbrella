const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Get all categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  }).then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Get one category by id
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
     model: Product,
     attributes: [
       'id',
       'product_name',
       'price',
       'stock'
     ]
    } 
    ]
  }).then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//Create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//Update the name of an existing category
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
  },
  {
  where: {
    id: req.params.id
  }
})
.then(dbCategoryData => {
  if(!dbCategoryData) {
    res.status(404).console.log('No category found with this id.');
    return;
  }
  res.json(dbCategoryData);
})
.catch(err => {
  if (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
});

//Delete a category, by id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json( {message: 'No category found with this id.' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
  }
  });
});

module.exports = router;
