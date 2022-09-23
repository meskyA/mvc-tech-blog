const { Post } = require('../models');

const postdata =
[
  {
    "postTitle": "Fall is here!",
    "postContent": "Trees are changing their colors",
    "userId": 1
  },
  {
    "postTitle": "Fruits",
    "postContent": "Seasonal fruits are cheper now.",
    "userId": 2
  },
  {
    "postTitle": "Documentaries?",
    "postContent": "They are very educational.",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;