const { createNewComment, getAllComments } = require("../controllers/CommentController");

const commentRouter = require("express").Router();

commentRouter.post('/comment/:userId', createNewComment)
commentRouter.get('/comments', getAllComments)

module.exports = commentRouter;