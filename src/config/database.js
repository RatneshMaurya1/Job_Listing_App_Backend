const mongoose = require("mongoose")
require("dotenv").config()
const MONGO_URI = process.env.MONGO__URI
const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI,{
            dbName: 'jobApp',  
        })
    } catch (error) {
        console.log("mongodb connection failed" + error)
        process.exit(1)
    }
}

module.exports = connectDb