const express = require("express")
require("dotenv").config()
const connectDb = require("./config/database")
const app = express()
const PORT = process.env.PORT || 5000

app.get("/home", (req,res) => {
    res.send("hello from the server")
})

connectDb()
.then(() => {
    console.log("MongoDB connected successfully...")
    app.listen(PORT,() => {
        console.log(`server is running on ${PORT}`)
    })
}).catch((err) => {
    console.log("mongodb connection failed" + err)
})
