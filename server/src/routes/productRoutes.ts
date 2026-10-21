import express from 'express'
import {fetchProducts, verifyCart } from '../controllers/productController.js'
import { requireAdmin } from '../middleware/requireAdmin.js'


export const productRouter = express.Router()



productRouter.get('/all-products',requireAdmin, fetchProducts)




productRouter.post('/verify-cart', verifyCart)

