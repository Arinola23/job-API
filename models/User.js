const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please provide name'],
        minlength:3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: [true, 'please provide email'],
        minlength:3,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'please provide password'],
        minlength:6,
       // maxlength: 12, password cannot have maxlength because of the salt and bcrypt which makes the original password into bits
    }
})
            //Using mongoose middleware to hasspassword. Creating mongoose middleware here to prevent the controllers from being clumsy. The hashedpassword is however moved to the model
            //using the 'this' because it allow the use of callback functions.
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    //using indicates to move tot the next middleware
    // next()
})
//instance methods mongoose middleware
userSchema.methods.createJWT = function () {
    // return jwt.sign({userId:this._id, name: this.name}, 'jwtsecret', {expiresIn: '30d'} ) the hard coded way
    return jwt.sign({userId:this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME} )

}

//compare password using instant method and compare middleware
userSchema.methods.comparePassword = async function(candidatePassword) {
return await bcrypt.compare(candidatePassword, this.password)

}
const User = mongoose.model('User', userSchema)

module.exports = User
