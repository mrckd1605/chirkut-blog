import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


mongoose.connect(process.env.MONGOCONNECTION)
.then(()=>{
    console.log("mongodb is connected")
}).catch(err=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log("server listening at 3000")
})