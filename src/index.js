const express = require("express")
require("dotenv").config()
const connectDb = require("./config/database")
const userRouter = require("./routes/userRouter")
const jobRouter = require("./routes/jobRouter")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000

const corsOption = {
    origin: ["http://localhost:5173","https://job-listing-app-frontend-ratnesh.vercel.app/"],
    credentials: true,
}
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
app.use("/api/",userRouter)
app.use("/api/", jobRouter)

connectDb()
.then(() => {
    console.log("MongoDB connected successfully...")
    app.listen(PORT,() => {
        console.log(`server is running on ${PORT}`)
    })
}).catch((err) => {
    console.log("mongodb connection failed" + err)
})
