const sequelize = require('../config/connection');
const { User, Bill, Category, Income  } = require('../models');

const userData = require('./userData.json');
const billData = require('./billData.json');
const categoryData = require('./categoryData.json');
const incomeData = require('./incomeData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    // individualHooks: true,
    // returning: true,
  });

  const categories = await Category.bulkCreate(categoryData, {
  });
 
  const bills = await Bill.bulkCreate(billData, {
  }); 
  
  const incomes = await Income.bulkCreate(incomeData, {
  });
  
};
seedDatabase();