const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRouter.js');
const commentRoutes = require('./commentRoute');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;

