// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Each product belongs to one category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

//Each category has many products
Category.hasMany(Product, {
  foreignKey: 'category_id'
})

 //Each product belongs to many tags, through ProductTag model 
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'product_tags',
  foreignKey: 'product_id'
})

// Each tag belongs to many products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'product_tags',
  foreignKey: 'tag_id' 
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
