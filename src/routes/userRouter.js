const express = require("express")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const User = require("../models/user.schema")
require("dotenv").config()
const userRouter = express.Router()

userRouter.post("/signup",async (req,res) => {
    try {
    const {name,email,password,phone} = req.body
    const hashPassword = await bcrypt.hash(password,10)
    const user = new User({
        name,
        email,
        password:hashPassword,
        phone
    })
    const token = JWT.sign({email}, process.env.SECRET)
    res.cookie("token",token)
    await user.save()
    res.status(200).json({message:"user created successfully",
        data:user
    })
    } catch (error) {
        res.status(400).send("failed to create user " + error)
    }
})

userRouter.post("/signin", async (req,res) => {
    try{
        const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new Error("invalid email or password")
    }
    const isValidPassword = await bcrypt.compare(password,user.password)
    if(!isValidPassword){
        throw new Error("invalid email or password")
    }
    const token = JWT.sign({email}, process.env.SECRET)
    res.cookie("token",token)
    res.json({message: "Logged in successfully",
        user
    })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

module.exports = userRouter