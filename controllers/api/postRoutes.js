const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
          attributes: ['id',
              'postTitle',
              'postContent',
              'dateCreated'
          ],
          order: [
              [' dateCreated', 'DESC']
          ],
          include: [{
                  model: User,
                  attributes: ['username']
              },
              {
                  model: Comment,
                  attributes: ['id', ' comment_content', 'postId', 'userId', 'dateCreated'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              }
          ]
      })
      .then(dbPostData => res.json(dbPostData.reverse()))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });

});
router.get('/:id', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['id',
              'postContent',
              'postTitle',
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
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.post('/', withAuth, (req, res) => {
  Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
  Post.update({
          title: req.body.title,
          content: req.body.content
      }, {
          where: {
              id: req.params.id
          }
      }).then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
      where: {
          id: req.params.id
      }
  }).then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(dbPostData);
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;