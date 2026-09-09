import type {Request, Response} from 'express'


interface HttpParams {
    req: Request,
    res: Response
}

export async function fetchAllProducts({req, res}: HttpParams) {
    res.status(200).json({
        message: "Yes it worked",
        data: {
            products: ["Product 1", "Product 2", "Product 3"]
        }
    })
}