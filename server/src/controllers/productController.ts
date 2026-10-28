import type { NextFunction, Request, Response } from 'express'
import { products, type CartItem } from '../product.Data.js'
import { verifyCartService, fetchProductService } from '../services/productService.js'
import { productModel } from '../models/productModel.js'
import { Document } from 'mongoose'
import { getPagination } from '../utils/pagination.js'


interface HttpParams {
    req: Request,
    res: Response
}



//Fech All Products
export async function fetchProducts(req: Request, res: Response, next: NextFunction) {
     console.log("Route accesssed")
    const category = typeof req.query.category === "string" ? req.query.category : undefined
    const pageNo = Number(req.query.pageNo) 
    const limit = Number(req.query.limit) || 6
    
    //If isAvailable params is missing, set to true else check if it is true/false
    const isAvailable =req.query.isAvailable === undefined ? true : req.query.isAvailable === "true"
  
    const {formatedLimit, formatedPageNo, skip} = getPagination(req.query)
 
    const fetchedProducts =  await fetchProductService({ category, pageNo: formatedPageNo, limit: formatedLimit, isAvailable, skip });
      
     const {products, pagination} = fetchedProducts
    
     //This is used to throw error
    // if (!product) {
    //     throw new AppError("Product not found", 404);
    // }

    

    return res.status(200).json({ length: products.length , data: { products, pagination } })
    //No try cath block. Expresss 5 passes errors automatically to error handler

}



// Verify Cart

interface VerificationResponse {
    needsReview: boolean,
    verifiedItems: CartItem[],
    priceChanges: CartItem[],
    nonExistentItems: number
}

export async function verifyCart(req: Request, res: Response, next: NextFunction) {
    console.log("Verifying cart")

    try {
      
        // Get all the products tp be verified.
        const { cartProducts } = req.body

        if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
            return res.status(400).json({ message: 'Cart items are required' });
        }


        console.log("Got here. Verifcation data is ", cartProducts)

        const result = await verifyCartService(cartProducts);


        return res.status(200).json({ message: "Succesful", data: result })

    } catch (error) {
        next(error) // Passes error to error handler 
    }


}