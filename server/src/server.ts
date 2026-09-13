import express from "express";
import type {Request, Response} from 'express'
import 'dotenv/config'
import cors from 'cors'
import { productRouter } from "./routes/productRoutes.js";



const myApp = express()
const PORT = process.env.PORT || 3000

myApp.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

myApp.get('/', (req:Request, res:Response)=>{
    res.send("Welcome to my Server!!!=")
})


myApp.use('/api/products', productRouter)




myApp.listen(PORT, ()=>{
    console.log("Server listening on port ", PORT)
})