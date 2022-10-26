// import models
const User = require('./User');
const Bill = require('./Bill');
const Category = require('./Category');
const Income = require('./Income');

// A user can have many bills, bill has one user
User.hasMany(Bill, {
  foreignKey: ''
})
Bill.belongsTo(User)

// A user can have many incomes, income has one user
User.hasMany(Income, {
  foreignKey: ''
})
Income.belongsTo(User)

// A category can have many bills, bill has one category
Category.hasMany(Bill, {
  foreignKey: ''
})
Bill.belongsTo(Category)

module.exports = {
  User,
  Bill,
  Category,
  Income
};
