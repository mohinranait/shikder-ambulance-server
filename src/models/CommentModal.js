const { Schema, Types, model } = require("mongoose");

const commentSchema = new Schema({
    autor:{
        type: Types.ObjectId,
        ref:"User",
    },
    name: {
        type: String,
    },
    postId:{
        type: Types.ObjectId,
        ref:"Post",
    },
    content:{
        type: String,

    },
    star:{
        type: Number,
        default:5,
    },
},{timestamps:true})

const Comment = model("Comment",commentSchema);
module.exports = Comment;