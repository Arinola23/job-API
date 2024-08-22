const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit') 

//cconnetDB
const connectDB =require("./db/connect")
connectDB()

//routers
const authRouters = require('./routes/auth')
const jobsRouters = require('./routes/jobs')


//error handlers
const AuthenticateUser = require('./middleware/authentication')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// const errorHandlerMiddleware = require('./middleware/error-handler')

//express.
app.se("trust proxy", 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMs 
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
app.use('/api/v1/auth', authRouters)
app.use('/api/v1/jobs', AuthenticateUser, jobsRouters)

//using the error handlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
// app.use(errorHandlerMiddleware)


//port
const port = process.env.PORT || 4400

const start = async () => {
    try{
        app.listen(port, console.log(`server listening on ${port}`));
    } catch(err){
        console.log(err)
    }
}
        start()