import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app=express()
const port=process.env.PORT||4000
connectDB()
connectCloudinary()

// MIDDLEWARES
app.use(express.json())
app.use(cors())

// API endpoints
app.use('/api/admin', adminRouter)     
// “Hey Express, for any URL that starts with /api/admin, go look inside adminRouter to handle it.”
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res)=>{
    res.send('API WORKING....')
})







app.listen(port, ()=>console.log("Server Started at Port: ", port))