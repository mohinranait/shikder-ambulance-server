const {Schema, model} = require('mongoose');

const collectEmailSchema = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type : String,
    },
    phone: {
        type : String,
    },
}, {timestamps:true});

const CollectEmail = model("CollectEmail", collectEmailSchema);

module.exports = CollectEmail;