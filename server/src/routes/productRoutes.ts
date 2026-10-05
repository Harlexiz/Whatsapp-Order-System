import express from 'express'
import { fecthTestProducts, fetchAllProducts, verifyCart } from '../controllers/productController.js'


export const productRouter = express.Router()



productRouter.get('/all-products', fetchAllProducts)

productRouter.get('/my-products', fecthTestProducts)


productRouter.post('/verify-cart', verifyCart)

