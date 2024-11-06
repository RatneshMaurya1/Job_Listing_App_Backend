const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    salary:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

const Job = mongoose.model("Job", jobSchema)

module.exports = Job