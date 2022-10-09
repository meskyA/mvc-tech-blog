const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post')

User.hasMany(Post, {
  foreignKey: 'userId'
  // onDelete: 'CASCADE'
});
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  hooks:true
});
Post.belongsTo(User, {
  foreignKey: 'userId'
  // onDelete: 'CASCADE'
});
// Post.hasMany(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
  hooks: true
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  hooks: true

});
Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
  hooks: true
});

module.exports = { User, Comment, Post };
