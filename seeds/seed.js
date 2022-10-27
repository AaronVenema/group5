const sequelize = require('../config/connection');
const { User, Bill, Category, Income  } = require('../models');

const userData = require('./userData.json');
const billData = require('./billData.json');
const categoryData = require('./categoryData.json');
const incomeData = require('./incomeData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate(categoryData, {
  });
 
  Bill.bulkCreate(billData, {
  }); 
  
  Income.bulkCreate(incomeData, {
  });
  
};
seedDatabase();