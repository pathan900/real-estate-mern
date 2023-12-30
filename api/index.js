import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


const app = express()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected !!!")
    app.listen(3000, () => {
        console.log("server is running at port 3000")
    })
}).catch((error) => {
    console.log(error)
})


