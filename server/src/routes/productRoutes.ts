import express from 'express'
import { fetchAllProducts } from '../controllers/productController.js'


export const productRouter = express.Router()



productRouter.get('/all-products', fetchAllProducts)