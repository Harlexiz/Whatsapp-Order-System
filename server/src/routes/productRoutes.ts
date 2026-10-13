import express from 'express'
import {fetchProducts, verifyCart } from '../controllers/productController.js'


export const productRouter = express.Router()



productRouter.get('/all-products', fetchProducts)




productRouter.post('/verify-cart', verifyCart)

