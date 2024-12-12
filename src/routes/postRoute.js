const { createNewPost, postViewBySlug, updatePostById, deletePostById } = require('../controllers/PostController');
const { isAuth } = require('../middleware/isAuth');

const postRoute = require('express').Router();

postRoute.post('/post', isAuth, createNewPost)
postRoute.get('/post/:slug', postViewBySlug)
postRoute.patch('/post/:id', isAuth, updatePostById)
postRoute.delete('/post/:id', isAuth, deletePostById)

module.exports = postRoute;