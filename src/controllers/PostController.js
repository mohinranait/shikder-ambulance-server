const { createSlug } = require("../helpers/helper");
const  Post  = require("../models/PostModal");
const { successResponse } = require("../utils/responseHandler");
const createError = require('http-errors')
const User = require('../models/UserModal');

// Create new post method
const createNewPost = async (req, res, next) => {

    try {
        const user = req.user;

        if( !user?.id) throw createError(500, "You can't create new post");

        const body=  req.body;
        const title= body?.title;
        if(!title) throw createError(400, "Title is required");

        // Generate slug
        let slug = '';
        if(!body?.slug){
            slug = createSlug(title) 
        }else{
            slug = body.slug
        }
        
        
        // check exists thsi slug
        const findPostBySlug = await Post.find({slug}).select('slug');
        if(findPostBySlug?.length > 0){
            slug = `${slug}-${ Math.random()?.toString()?.split('.')[1] }`
        }
        
        

        // Create new post
        const post = await Post.create({...body,author: user?.id,slug })

        return successResponse(res,{
            message: 'Post created',
  
            payload: {
                post
            }
        })
    } catch (error) {
        next(error)
    }
}


// Post details by slug
const updatePostById = async (req, res,next) => {
    try {
        const postId = req?.params?.id;
        const user = req?.user;
        if(!postId || !user?.id) throw createError(500, "Somthing wrong for access");

        const body = req.body;

        // Check login user
        const authUser = await User.findById(user?.id).select('email');
        if(!authUser) throw createError(404, "User not found");

        // Check exists Post 
        const existsPost = await Post.findById(postId).select('author slug');
        if(!existsPost) throw createError(404, "Post not found");
    
        
        // Check post owner 
        if(authUser?._id?.toString() !== existsPost?.author?.toString()){
            throw createError(403 ,"You can't update for permission access")
        }
        

        // Check duplicate slug 
        if(existsPost?.slug !== body?.slug){
            const existingPostBySlug = await Post.findOne({slug: body?.slug}).select('slug'); 
            if( existsPost?.slug !== existingPostBySlug?.slug ){
                throw createError(404 ,"Slug is already in use by another post.")
            }
        }
        
        // Create new psot
        const post = await Post.findByIdAndUpdate(existsPost?._id, {...body}, {runValidators:true,new:true,})
        if(!post){
            throw createError(404 ,"Somthing wrong")
        }
      

        return successResponse(res, {
            message:"Success",
            statusCode:201,
            payload:{
                post,
            }
        })
    } catch (error) {
        next(error)
    }
}

// Post details
const postViewBySlug = async (req, res,next) => {
    try {
        const slug = req.params?.slug;
   
        const post = await Post.findOne({slug})
  
        if(!post) throw createError(404, "Post not-found")

        return successResponse(res, {
            message:"Success",
            statusCode:200,
            payload:{
                post,
            }
        })
    } catch (error) {
        next(error)
    }
}

/**
 * Delete post by ID
 */ 
const deletePostById = async (req,res, next) => {
    try {
        const postId = req.params?.id;
        const userId = req?.user?.id;

        if(!postId || !userId){
            throw createError(500, "Somthing wrong for delete post");
        }

        const post = await Post.findById(postId).select('author');
        if(!post) throw createError(404, "Post not-found for delete");

        if( post?.author?.toString() !== userId ){
            throw createError(500, "You can't delete this post for access issue");
        }

        await Post.findByIdAndDelete(postId)

        return successResponse(res, {
            message:"Post has been deleted",
            statusCode:200,
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNewPost,
    postViewBySlug,
    updatePostById,
    deletePostById,
}