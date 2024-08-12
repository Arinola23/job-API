const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const AuthenticateUser = require('./middleware/authentication')

//cconnetDB
const connectDB =require("./db/connect")
connectDB()

//routers
const authRouters = require('./routes/auth')
const jobsRouters = require('./routes/jobs')


//error handlers
const notFoundMiddleware = require('./middleware/not-found')
// const errorHandlerMiddleware = require('./middleware/error-handler')

//express.json
app.use(express.json())


//routes
app.use('/api/v1/auth', authRouters)
app.use('/api/v1/jobs', AuthenticateUser, jobsRouters)

//using the error handlers
app.use(notFoundMiddleware)
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