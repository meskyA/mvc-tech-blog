const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// Posts dashboard
router.get('/', withAuth, async (req, res) => {
  try {
  
    const postData = await Post.findAll({
      where:{"userId": req.session.userId},
      include: [User]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
console.log(posts);
    res.render('all-posts', {
      // specifies a different layout.
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// New post
router.post('/new', withAuth, (req, res) => {
  res.render('newPost', {
    layout: 'dashboard',
  });
});

// Edit a post
router.get('/edit/:id', withAuth, async (req, res) => {
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