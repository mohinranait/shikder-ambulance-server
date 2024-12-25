const Comment = require("../models/CommentModal");
const { successResponse } = require("../utils/responseHandler");

/**
 * Create new comment
*/
const createNewComment = async (req, res, next) => {
    try {
        const userId = req?.params?.userId
        const body = req?.body;
 
        if(userId !== 'not-auth'){
            body.autor = userId;
        }
        const comment = await Comment.create(body)
        return successResponse(res,{
            statusCode:201,
            message:"Comment submited",
            payload:{
                comment
            }
        })
    } catch (error) {
        next(error)
    }
}

/**
 * Get all comments
*/
const getAllComments = async (req, res,next) => {
    try {
        const postId = req?.query?.postId;
       
        const query=  {
            postId,
        }
        const comments = await Comment.find(query);
      
        
        return successResponse(res,{
            statusCode:200,
            payload:{
                comments,
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNewComment,
    getAllComments
}