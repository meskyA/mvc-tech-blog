const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const sequelize = require('../config/connection');
// const withAuth = require('../utils/auth');

// Get all posts for homepage
router.get('/',  (req, res) => {
   Post.findAll({
    attributes: [
      'id',
      'postTitle',
      'postContent',
      'dateCreated'
  ],
  include: [{
          model: Comment,
          attributes: ['id', 'comment_content', 'postId', 'userId', 'dateCreated'],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User,
          attributes: ['username']
      }
  ]
})
.then(dbPostData => {
  const posts = dbPostData.map(post => post.get({ plain: true }));
  res.render('dashboard.handlebars', { posts, loggedIn: req.session.loggedIn });
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

// Get one post
router.get('/post/:id',  (req, res) => {
   Post.findOne({
      where: {
        id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render('single-post', { post, loggedIn: req.session.loggedIn });

    })
    
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// sign-up and login options on homepage
router.get('/login', (req, res) => {
  if (req.body.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});
router.get('/post-comments', (req, res) => {
  Post.findOne({
    id: req.params.id
  })
  .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    const post = dbPostData.get({ plain: true });
    console.log(post);
    res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
module.exports = router;