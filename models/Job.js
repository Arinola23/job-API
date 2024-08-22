const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: [true, "enter name"]
    },
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 500
    },
    status: {
        type: String,
        enum:['interview', 'declined', 'pending'], // option where to set up arrays with positive options
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId, //here we will tie our job with the actual user. Each object i.e company and position with a unique user objectid
        ref: 'User', //because we dont want to create a job without a user
        required: [true, 'Please provide user']
    }
}, {timestamps:true})

const Job = mongoose.model('Job', JobSchema)
module.exports = Job