const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get('/', (req, res) => {
  Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
});
router.get("/", (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id
  }
  })
    .then(dbCommentData => 
    res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// router.get("/:id", (req, res) => {
//   Comment.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbCommentData) => res.json(dbCommentData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_content: req.body.comment_content,
      postId: req.body.postId,
      userId: req.session.userId,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// update
router.put("/:id", withAuth, (req, res) => {
  Comment.update(
    {
      comment_content: req.body.comment_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment with this id was found" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => res.json(err));
    });


router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment with this id was found" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => res.json(err));
  });

module.exports = router;
