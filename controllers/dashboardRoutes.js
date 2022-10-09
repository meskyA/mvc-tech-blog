const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// Posts dashboard
router.get('/', withAuth, (req, res) => {
Post.findAll({
      where: { userId: req.session.userId,
           },   
      
    attributes: [
      'id',
      'postContent',
      'PostTitle',
      'dateCreated'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_content', 'postId:', 'userId', 'dateCreated:'],
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
  const posts = dbPostData.map((post) => post.get({ plain: true }));
  res.render('dashboard', {
    posts, loggedIn: true });
           
})
  
 .catch (err => {
   console.log(err);
    res.status(500).json(err);
  });
});

// Edit a post
router.get('/edit/:id', withAuth, async (req, res) => {
    Post.findOne ({
      where: {
        id: req.params.id
      },
      attributes: ['id',
                'postTitle',
                'postContent',
                'dateCreated'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'postId', 'userId', 'dateCreated'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
    .then(dbpostData => {
      if (!dbpostData) {
        res.status(404).json({ message: 'No post with this id found.'});
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('editPost', { post, loggedIn: true });
    })
 .catch (err => {
   console.log(err);
    res.status(500).json(err);
});
})
router.get('/new', (req, res) => {
  res.render('newpost');
});


module.exports = router;