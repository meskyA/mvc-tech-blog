const { User }= require('../models');
const userData = [

  {
    "username": "Mandy",
    "password": "password92022"
  },
  {
    "username": "Superman",
    "password": "password92022"
  },
  {
    "username": "Sweet",
    "password": "password92022"
  }
];

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
