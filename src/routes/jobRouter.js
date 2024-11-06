const express = require("express")
const userAuth = require("../middleware/userAuth")
const Job = require("../models/job.schema")


const jobRouter = express.Router()

jobRouter.post("/job", userAuth, async (req,res) => {
    try {
        const user = req.user
        const {title,description,salary,location} = req.body
        const newJob = new Job({
            title,
            description,
            salary,
            location,
            userId: user._id
        })
        await newJob.save()
        res.status(200).json({message: "job created successfully",
            newJob
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

jobRouter.put("/job/:id", userAuth, async (req,res) => {
    try {
        const user = req.user
    const { title, description, salary, location } = req.body;
    const updatedJob = await Job.findOne({_id:req.params.id, userId:user._id})
    if(!updatedJob){
        return res.status(401).json({message: "job not found"})
    }
    if (title !== undefined) updatedJob.title = title;
    if (description !== undefined) updatedJob.description = description;
    if (salary !== undefined) updatedJob.salary = salary;
    if (location !== undefined) updatedJob.location = location;
    await updatedJob.save()
    res.status(200).json({message: "job updated successfully",
        updatedJob
    })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

jobRouter.delete("/job/:id", userAuth, async (req,res) => {
    try {
        const user =  req.user
    const deletedJob = await Job.findOne({_id:req.params.id, userId:user._id})
    if(!deletedJob){
        throw new Error("jon not found")
    }
    await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "job deleted successfully",
        deletedJob
    })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
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
        res.status(400).send("Error: " + error.message)
    }
})


module.exports = jobRouter

