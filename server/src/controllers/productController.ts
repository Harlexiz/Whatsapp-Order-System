import type { Request, Response } from 'express'
import { products, type CartItem } from '../product.Data.js'
import { verifyCartService } from '../services/productService.js'


interface HttpParams {
    req: Request,
    res: Response
}



//Fech All Products
export async function fetchAllProducts(req: Request, res: Response) {
    setTimeout(() => {
        res.status(200).json({
            message: "Yes it worked",
            data: {
                products
            }
        })

    }, 5000)

}

//test Fetch all the products

export async function fecthTestProducts(req: Request, res: Response) {
    const { category } = req.query
    console.log("Category recieved was ", category)

    if (category === 'all') {
        // const myProducts = products.filter((item)=> item.category === category)
        return res.status(200).json({
            message: "All Products fetch",
            data: {
                products
            }
        })
    }

    //Do this 
    const myProducts = products.filter((item) => item.category === category)
    setTimeout(() => {
        return res.status(200).json({
            message: "Caregrioty",
            data: {
                products: myProducts
            }
        })
    }, 5000)


}



// Verify Cart

interface VerificationResponse {
    needsReview: boolean,
    verifiedItems: CartItem[],
    priceChanges: CartItem[],
    nonExistentItems: number
}

export async function verifyCart(req: Request, res: Response) {
    console.log("Verifying cart")

    try {
        const initial = Date.now()
        // Get all the products tp be verified.
        const { cartProducts } = req.body

        if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
            return res.status(400).json({ message: 'Cart items are required' });
        }


        // // let result;

        // const result = await verifyCartService(cartProducts);
        // console.log("Result is ", result)
        // // console.log("Final is", Date.now() - initial)


        // res.status(200).json({ message: "Succesful", data: result })



        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await delay(2000);

        const result = await verifyCartService(cartProducts);


        return res.status(200).json({ message: "Succesful", data: result })




        // //Check if cart is an array or cart is empty

        //  if (!Array.isArray(products) || products.length === 0) {
        //   return res.status(400).json({ message: 'Cart items are required' });
        // }

    } catch (error) {
        console.log("Erro Joor")
    }


}