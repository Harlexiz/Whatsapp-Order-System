import express, {type Application} from "express";
import type {NextFunction, Request, Response} from 'express'
import 'dotenv/config'
import cors from 'cors'
import { productRouter } from "./routes/productRoutes.js";
import connectDB from "./config.js/db.js";
import { errorHandler } from "./middleware/errorHandler.js";



const myApp: Application = express()
const PORT = process.env.PORT || 3000

myApp.use(express.json())

myApp.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

//Database connection
connectDB()

myApp.get('/', (req:Request, res:Response)=>{
    res.send("Welcome to my Server!!!=")
})



// Routers
myApp.use('/api/products', productRouter)



//Error Handler
myApp.use(errorHandler)

myApp.listen(PORT, ()=>{
    console.log("Server listening on port ", PORT)
})