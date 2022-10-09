const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// Create New Post
router.post('/', withAuth, async (req, res) => {

  Post.create({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    userId: req.session.userId
})
.then(dbPostData => res.json(dbPostData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
//   const body = req.body;
//     console.log(body);
//   try {
//     const newPost = await Post.create({ ...body, userId: req.session.userId });
//     console.log("This is the new post: ",  newPost);
//     res.json(newPost);
//      } catch (err) {
//        console.log('ERROR!', err);
//     res.status(500).json(err);
//   }
// });

// Update 

router.put('/:id', withAuth, async (req, res) => {
  // try {
  //   console.log('req.body', req.body);
  //   const [updatedPost] = await 
    Post.update(req.body, {
      where: {
        id: req.params.id,
      }
    }

    )


    // if (updatedPost > 0) {
    //   res.status(200).end();
    // } else {
    //   res.status(404).end();
    // }
    .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(dbPostData);
  })
  .catch (err =>  {
    console.log(err);
    res.status(500).json(err)
  });
});

// Delete/Destroy post


router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;