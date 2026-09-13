import type { Request, Response } from 'express'
import { products } from '../product.Data.js'


interface HttpParams {
    req: Request,
    res: Response
}

export async function fetchAllProducts({ req, res }: HttpParams) {
    setTimeout(() => {
        res.status(200).json({
            message: "Yes it worked",
            data: {
                products
            }
        })

    }, 5000)

}