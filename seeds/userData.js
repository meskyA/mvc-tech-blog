const { User }= require('../models');
[
  {
    "name": "Mandy",
    "email": "mandy@gmail.com",
    "password": "password92022"
  },
  {
    "name": "Superman",
    "email": "super@gmail.com",
    "password": "password92022"
  },
  {
    "name": "Sweet",
    "email": "sweet@yahoo.com",
    "password": "password92022"
  }
];

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
