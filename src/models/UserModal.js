const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    name : {
        firstName: {
            type: String,
            required: true,
            trim:true,
        },
        lastName: {
            type: String,
            required: true,
            trim:true,
        },
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
        trim:true,
    },
    profile:{
        type: Types.ObjectId ,
        ref: "Media"
    },
    role:{
        type: String,
        default:"User",
        enum:['Admin',"User"]
    },
    status:{
        type: String,
        default:"Active",
        enum: ['Active', 'Pending', 'Banned'],
    }
});

const User = model("User", userSchema);

module.exports = User;