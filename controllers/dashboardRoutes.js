const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// Posts dashboard
router.get('/', withAuth, (req, res) => {
//   try {
  
//     const postData = await 
Post.findAll({
      where:{userId: req.session.userId,
      include: [User]
    },
    attributes: [
      'id',
      'postContent',
      'PostTitle',
      'dateCreated',
    ],
    include: [
      {
        model: Post,
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
  console.log(posts);
      res.render('dashboard', {
        // specifies a different layout.
        posts, loggedIn: true });
       
})
  
 .catch (err => {
   console.log(err);
    res.status(500).json(err);
  });
});

// New post
// router.post('/new', withAuth, (req, res) => {
//   res.render('newPost', {
//     layout: 'dashboard',
//   });
// });

// Edit a post
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // serializing the data
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('editPost', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;