import express from 'express'
import { fetchAllProducts, verifyCart } from '../controllers/productController.js'


export const productRouter = express.Router()



productRouter.get('/all-products', fetchAllProducts)


productRouter.post('/verify-cart', verifyCart)

