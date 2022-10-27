// import models
const User = require('./User');
const Bill = require('./Bill');
const Category = require('./Category');
const Income = require('./Income');


User.hasMany(Bill, {
  foreignKey: 'user_id'
})
Bill.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Income, {
  foreignKey: 'user_id'
})
User.belongsTo(Income, {
  foreignKey: 'user_id'
})

Category.hasMany(Bill, {
  foreignKey: 'category_id'
})
Bill.belongsTo(Category, {
  foreignKey: 'category_id'
})

module.exports = {
  User,
  Bill,
  Category,
  Income
};
