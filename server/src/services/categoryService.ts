import type { Types } from "mongoose";
import { categoryModel } from "../models/categoryModel.js";
import { AppError } from "../utils/appError.js";





interface FetchCategoryReturn {
    _id: Types.ObjectId,
    name: string
}


export async function fetchCategoryService(): Promise<FetchCategoryReturn[]> {

    const categories = await categoryModel.find().select("name ")

    if (!categories) {
        throw new AppError("Error return catgories", 404)
    }

    return categories

}



interface AddCategoryBody {
    name: string,
    description: string
}

export async function addCategoryService({ name, description }: AddCategoryBody) {

    const categoryExists =  await categoryModel.findOne({ name }).collation({ locale: "en", strength: 2 });
    
    if (categoryExists) {
        throw new AppError("Category Exists", 404)
    }

    categoryModel.create({
        name,
        description
    })

    return


}