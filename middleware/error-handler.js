//creating a user friendly validator error(password, email),duplicate email and cast error(ID) error handler 
const customAPIError = require('../errors/custom-api')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err,req,res,next) => {
//creating a new custom error object
  let customError = {
            //set default error instead of using the if statement below to check the possible error
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "something went wrong try again later"}
               // (general use gets activated when needed) the customAPIError can be used to view the error details in pm which can/will be used in the customError to properly access the error.
          if(err instanceof customAPIError) {
          return res.status(err.statusCode).json({msg: err.message})
          }
          // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});

            //validator error-handler
         if(err.name === "ValidationError"){
            customError.msg = Object.values(err.errors).map((item)=> item.message).join(',')
            customError.statusCode = 400
         }
           //dulicated email error handler.
        if(err.code && err.code === 11000) {
                          //object keyvalue of keys
            customError.msg =`Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
            customError.statusCode = 400
        }
           //cast error (id error)
        if(err.name === "CastError"){
            customError.msg = `no value with id: ${err.value}`
            customError.statusCode = 404
        }
       return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware
