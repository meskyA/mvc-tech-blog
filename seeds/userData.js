const { User }= require('../models');
const userData = [

  {
    "username": "Mandy",
    "email": "mandy@gmail.com",
    "password": "password92022"
  },
  {
    "username": "Superman",
    "email": "super@gmail.com",
    "password": "password92022"
  },
  {
    "username": "Sweet",
    "email": "sweet@yahoo.com",
    "password": "password92022"
  }
];

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
