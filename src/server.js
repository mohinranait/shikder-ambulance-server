const express = require('express');
const { SERVER_PORT } = require('./accessEnv');
const { userRoute, postRoute, uploadImageRouter, commentRouter, emailRouter, moneyRouter } = require('./routes');
const rateLimit = require("express-rate-limit")
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const { connectMongodbDatabase } = require('./config/ConnectMongoDB');
const { errorResponse } = require('./utils/responseHandler');
const cors = require('cors')

const app = express();

connectMongodbDatabase()

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 50,
    statusCode: 429,
    message: { message: 'Your request is rich. Try again' }
})

app.use(limiter)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: ['http://localhost:3000','https://shikder-ambulance.vercel.app','https://shikderambulance.com'],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
)
app.use(cookieParser())

app.use('/api/', userRoute);
app.use('/api/', postRoute)
app.use('/api/', commentRouter)
app.use('/api/', uploadImageRouter)
app.use('/api/', emailRouter)
app.use('/api/', moneyRouter)

app.get('/',(req, res) => {
    res.send('Shikder ambulance server running');
})


app.use((req, res, next) => {
    next( createError(404, "route not found") )
})

app.use((err, req,res, next) => {
    return errorResponse(res, {
        message: err.message,
        statusCode: err.status
    })
   
})


app.listen(SERVER_PORT, () => {
    console.log(`Server is Running at http://localhost:${SERVER_PORT}`);
})




