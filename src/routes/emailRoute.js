const { contactFromEmail } = require('../controllers/EmailController');

const emailRouter = require('express').Router();

emailRouter.post('/contact-mail', contactFromEmail  )

module.exports = emailRouter;