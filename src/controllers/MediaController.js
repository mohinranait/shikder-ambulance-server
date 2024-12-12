const mongoose = require('mongoose');
const createError = require('http-errors');
const { successResponse } = require('../utils/responseHandler');
const Media = require('../models/MediaModal');
const cloudinary = require('../config/cloudinary')


// Update profile by ID
const uploadImage = async (req, res, next) => {
    try {

        const image = req.file?.path;
        const fileType = req?.body?.fileType;

        // upload profile image
        const imageRes = await cloudinary.uploader.upload(image, {
            folder: 'shikder',
        })

        const { url, format, width, height, bytes } = imageRes;


        const file = await Media.create({
            fileType: fileType,
            fileUrl: url,
            width,
            height,
            extension: format,
            size: bytes,
        })



        return successResponse(res, {
            statusCode: 200,
            message: "Image uploaded",
            payload: {
                file
            }
        })

    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error) {
            return next(createError(400, "Invalid user ID"))
        }
        next(error)
    }
}

module.exports = {
    uploadImage
}