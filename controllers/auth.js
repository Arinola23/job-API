const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const BadRequestError= require('../errors/bad-request');
const unAuthenticatedError = require('../errors/unauthenticated');

//const jsonwebtoken = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const { response } = require('express');

const register = async (req, res) => {
// res.json(req.body)
// a cleaner user controllers
const user = await User.create({...req.body})
const token = user.createJWT()
// the token has being moved to the model for a cleaner code using mongoose middleware 'methods'
//  const token = jwt.sign({userId: user._id, name: user.name}, 'jwtSecret', {expiresIn: '30d'})
//res.status(StatusCodes.CREATED).json({user: {name: user.getName()}, token })
res.status(StatusCodes.CREATED).json({user: {userId:user._id, name: user.name}, token})
}

const logIn = async (req, res) => {
const {email, password} = req.body
    if(!email) {
        throw new BadRequestError('email incorrect')
    }
    if(!password) {
        throw new BadRequestError('password incorrect')
    }
const user = await User.findOne({email})
if(!user){
    throw new unAuthenticatedError('Invalid credential "email" ')
}
//compare password
const isPasswordCorrect = await user.comparePassword(password)
if(!isPasswordCorrect){
    throw new unAuthenticatedError('invalid credentials "password" ')
}
const token = user.createJWT()
res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}

module.exports = {register, logIn}

//this is a longer method to hashpasswords, but the hashed password has been moved to the model by using the 'this' callback function
// const register = async (req, res) => {
//     // res.json(req.body)
//     //creating temporary user object
//     const {name, email, password} = req.body
    
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
    
//     //es6 method
//     const tempUser = {name, email, password:hashedPassword}
    
//     if(!name) {
//         throw new BadRequestError('Please provide name')
//     }
//     if(!email) {
//         throw new BadRequestError('Please provide email ')
//     }
//     if(!password) {
//         throw new BadRequestError('Please provide password')
//     }
//     // const user = await User.create({...req.body})
//     const user = await User.create({...tempUser})
//     res.status(StatusCodes.CREATED).json({user})
//     }