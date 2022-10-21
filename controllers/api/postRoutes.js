const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    // attributes: ["id", "postTitle", "postContent", "dateCreated"],
    // order: [[" dateCreated", "DESC"]],
    // include: [
    //   {
    //     model: User,
    //     attributes: ["username"],
    //   },
    //   {
    //     model: Comment,
    //     attributes: [
    //       "id",
    //       " comment_content",
    //       "postId",
    //       "userId",
    //       "dateCreated",
    //     ],
    //     include: {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //   },
    // ],
  })
    .then((dbPostData) => res.json(dbPostData.reverse()))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// API for single post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Post.create({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    userId: req.session.userId,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, async (req, res) => {
  console.log(req.params.id)
  console.table(req.body)
  await Post.update(
    {
      postTitle: req.body.postTitle,
      postContent: req.body.postContent,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      console.log(dbPostData)
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
