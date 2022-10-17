const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');


router.get('/', (req, res) =>{
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id:req.params.id
    },
    include: [{
      model: Post,
      attributes: [
        'id',
        'postTitle',
        'postContent',
        'dateCreated'
      ]
    },
    {
      model: Comment,
      attributes: ['id', 'comment_content', 'dateCreated'],
      include: {
        model: Post,
        attributes: ['postTitle'],
      }
    }
    ]
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No user with this id' });
      return;
    }
    res.json(dbUserData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  });

router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);

    });
   
    })
 .catch (err  => {
   console.log(err);
   res.status(500).json(err);
 });
  
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
        .json({ message: 'Wrong user name or password, please try again' });
      return;
    }

    const validPassword =  userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Wrong user name or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    // console.log('req.session ', req.session);
  });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// Logout
router.post('/logout', (req, res) => {
  // console.log(" logout route hit");
  // console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
     
    });
  } else {
    // console.log("in else path");
    res.status(404).end();   
  }
});
// update
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData[0]) {
      res.status(404).json({ message: 'No user with this id found'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
// delete
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No user with this id found'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});


module.exports = router;
