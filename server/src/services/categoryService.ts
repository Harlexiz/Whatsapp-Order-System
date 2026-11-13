import type { Types } from "mongoose";
import { categoryModel } from "../models/categoryModel.js";
import { AppError } from "../utils/appError.js";





interface FetchCategoryReturn{
  _id: Types.ObjectId,
  name:string
}


export async function fetchCategoryService():Promise<FetchCategoryReturn[]>{

    const categories = await categoryModel.find().select("name ")

    if(!categories){
        throw new AppError("Error return catgories", 404)
    }

    return categories

}