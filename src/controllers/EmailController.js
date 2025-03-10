const sendEmailByNodeMailer = require("../helpers/emailSender");
const createError = require('http-errors')
const { successResponse } = require("../utils/responseHandler");
const CollectEmail = require("../models/CollectEmail");

// handle Contact form email
const contactFromEmail = async (req, res,next) => {
    try {
        const {fullName, phone, email, from, to, message} = req.body;
        
        const emailData = {
            emails: 'rentsheba@gmail.com',
            subject: "Booking Shikder Ambulance",
            text: "Shikder Ambulance",
            html: `
            <p> Email from Contact form of Shikder Ambulance </p>
            <h3> Contact Information </h3>
            <ul>
                <li> <strong>Name : </strong> ${fullName} </li>
                <li> <strong>Phone : </strong> ${phone} </li>
                <li> <strong>Email : </strong> ${email || ''} </li>
                <li> <strong>Location : </strong> ${from} to ${to} </li>
                <li> <strong>Message : </strong> ${message || ''} </li>
            </ul>
            `
        }

        try {
            // Send email for email verification
            await sendEmailByNodeMailer(emailData)
            await CollectEmail.create({...req.body})
        } catch (emailError) {
            next( createError(500, "Send to fail verification email") )
        }

        // Send response
        return successResponse(res, {
            message: `Email send successfully`,
            statusCode:200
        })

    } catch (error) {
        next(error);
    }
}

module.exports = {
    contactFromEmail,
}