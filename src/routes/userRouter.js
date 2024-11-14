const express = require("express")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const User = require("../models/user.schema")
require("dotenv").config()
const userRouter = express.Router()

userRouter.post("/signup",async (req,res) => {
    try {
    const {name,email,password,phone} = req.body
    const isUserExists = await User.findOne({email})
    if(isUserExists){
       return res.status(400).json({message:"Email already taken",
        status:"400"
       })
    }
    if(name.length < 4){
       return res.status(400).json({message:"Name is too short",
        status:"400"
       })
    }
    if(name.length > 20){
       return res.status(400).json({message:"Name is too long",
        status:"400"
       })
    }
    const hashPassword = await bcrypt.hash(password,10)
    const user = new User({
        name,
        email,
        password:hashPassword,
        phone
    })
    const token = JWT.sign({email}, process.env.SECRET, )
    res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }
    )
    await user.save()
    return res.status(200).json({message:"user created successfully",
        status:"200",
        data:user
    })
    } catch (error) {
       return res.status(400).json({message:error.message,
        status:"400"
       })
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
    res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite:"none",
    }
    )
    return res.json({message: "Logged in successfully",
        user,
        token
    })
    } catch (error) {
       return res.status(400).json({message:error.message,
        status:"400"
       })
    }
})

module.exports = userRouter