import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.localMongoUri,{ autoIndex: true })
.then(()=>{
    console.log("mongodb is connected")
}).catch(err=>{
    console.log("Mongodb arror is : ",err)
})

app.use(express.json())

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)


// middleware

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

app.listen(3000,()=>{
    console.log("server listening at 3000")
})

