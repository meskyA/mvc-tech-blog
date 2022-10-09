const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// const sequelize = require('../config/connection');
// User sign-up
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({ where: { username: req.body.username } })
    .then(userData =>{
      console.log('userData ', userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect user name or password, please try again' });
      return;
    }

    const validPassword =  userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect user name or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    console.log('req.session ', req.session);
  });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// Logout
router.post('/logout', (req, res) => {
  console.log(" logout route hit");
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
     
    });
  } else {
    console.log("in else path");
    res.status(404).end();
    
  }

});


module.exports = router;
