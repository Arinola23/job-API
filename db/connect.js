const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        mongoose.set('strictQuery' , false)
        const conn = await mongoose.connect(process.env.DATABASE)
        console.log(`Connected to mongoDB database: ${conn.connection.host}`)
    }catch(error){
        console.log(`error connecting to mongoDB database: ${error}`)
    }
} 

module.exports = connectDB