import type { NextFunction, Request, Response } from 'express'
import { addCategoryService, fetchCategoryService } from '../services/categoryService.js'




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




export async function addCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, description } = req.body

        // trim only removes whitespace at the beginning and the ending of the string

        if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
            res.status(400).json({ message: "Name is required and must be 2 to 60 characters" });
            return
        }

        if (description !== undefined && (typeof description !== "string" || description.trim().length > 300)) {
            res.status(400).json({ message: "Description must be text of at most 300 characters"})
        }


       console.log("Got here")
        await addCategoryService({name, description})

        return res.status(201).json({message: "New Category Created Succesfully"})

        

    } catch (error) {
        next(error)
    }
}