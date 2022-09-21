const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create New Post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
    console.log(body);
  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    console.log("This is the new post: ",  newPost);
    res.json(newPost);
     } catch (err) {
       console.log('ERROR!', err);
    res.status(500).json(err);
  }
});

// Update 

router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('req.body', req.body);
    const [updatedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatededRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete/Destroy post

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [updatedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;