const { Comment } = require('../models');

const commentData = [{
        comment_content: "This is a great outcome",
        userId: 1,
        postId: 1
    },
    {
        comment_content: "Well done!",
        userId: 2,
        postId: 2
    },
    {
      comment_content: "This was a bit dissapointing",
        userId: 3,
        postId: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

