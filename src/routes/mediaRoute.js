const { uploadImage } = require("../controllers/MediaController");
const { isAuth } = require("../middleware/isAuth");
const upload = require("../middleware/uploadFile");

const uploadImageRouter = require("express").Router();


uploadImageRouter.post('/upload', isAuth , upload.single('file'), uploadImage)


module.exports = uploadImageRouter;