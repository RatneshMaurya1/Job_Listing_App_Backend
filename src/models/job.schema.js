const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXOB5zhZQdXKzS5jvNPuvzrQElWiRVQKLkRg&s",
  },
  jobPosition:{
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  remoteOffice: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  information:{
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{
  timestamps:true
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
