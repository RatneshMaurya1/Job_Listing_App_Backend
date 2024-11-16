const express = require("express")
const userAuth = require("../middleware/userAuth")
const Job = require("../models/job.schema")
const validateJobData = require("../middleware/isValidJob")


const jobRouter = express.Router()

jobRouter.post("/job", userAuth, validateJobData, async (req, res) => {
    try {
        const user = req.user;
        const { company, logoUrl, jobPosition, salary, jobType, remoteOffice, location, description, about, skills, information } = req.body;
        
        const newJob = new Job({
            company,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            remoteOffice,
            location,
            description,
            about,
            skills,
            information,
            userId: user._id
        });

        await newJob.save();
        return res.status(200).json({
            message: "Job created successfully",
            newJob
        });
    } catch (error) {
        return res.status(400).send("Error: " + error.message);
    }
});


jobRouter.put("/job/:id", userAuth, async (req, res) => {
    try {
        const user = req.user;

        const {
            company,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            remoteOffice,
            location,
            description,
            about,
            skills,
            information,
        } = req.body;

        const updatedJob = await Job.findOne({ _id: req.params.id, userId: user._id });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        updatedJob.company = company || updatedJob.company;
        updatedJob.logoUrl = logoUrl || updatedJob.logoUrl;
        updatedJob.jobPosition = jobPosition || updatedJob.jobPosition;
        updatedJob.salary = salary || updatedJob.salary;
        updatedJob.jobType = jobType || updatedJob.jobType;
        updatedJob.remoteOffice = remoteOffice || updatedJob.remoteOffice;
        updatedJob.location = location || updatedJob.location;
        updatedJob.description = description || updatedJob.description;
        updatedJob.about = about || updatedJob.about;
        updatedJob.skills = skills || updatedJob.skills;
        updatedJob.information = information || updatedJob.information;

        await updatedJob.save();

        return res.status(200).json({
            message: "Job updated successfully",
            updatedJob,
        });
    } catch (error) {
        return res.status(400).send("Error: " + error.message);
    }
});

jobRouter.delete("/job/:id", userAuth, async (req,res) => {
    try {
        const user =  req.user
    const deletedJob = await Job.findOne({_id:req.params.id, userId:user._id})
    if(!deletedJob){
        throw new Error("jon not found")
    }
    await Job.findByIdAndDelete(req.params.id)
    return res.status(200).json({message: "job deleted successfully",
        deletedJob
    })
    } catch (error) {
       return res.status(400).send("Error: " + error.message)
    }
})

jobRouter.get("/job/:id", async(req,res) => {
    try {
        const job = await Job.findOne({_id:req.params.id})
        if(!job){
            return res.status(400).json({message: "job not found"})
        }
        res.json(job)
    } catch (error) {
       return res.status(400).send("Error: " + error.message)
    }
})
jobRouter.get("/job", async(req,res) => {
    try {
        const job = await Job.find()
        if(!job){
            return res.status(400).json({message: "job not found"})
        }
        res.json(job)
    }  catch (error) {
        return res.status(400).send("Error: " + error.message)
     }
})


module.exports = jobRouter

