import type { NextFunction, Request, Response } from 'express'
import { fetchCategoryService } from '../services/categoryService.js'




//Fetch All Categories

export async function fetchCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await fetchCategoryService()

        return res.status(200).json({
            message: "Categories fetched successfully",
            data: categories,
        });

    } catch (error) {
        next(error)
    }
}
