const commentRouter = require("./commentRoute");
const emailRouter = require("./emailRoute");
const uploadImageRouter = require("./mediaRoute");
const moneyRouter = require("./moneyReceiptRoute");
const postRoute = require("./postRoute");
const userRoute = require("./userRoute");

module.exports = {
    userRoute,
    postRoute,
    uploadImageRouter,
    commentRouter,
    emailRouter,
    moneyRouter,
}