import type { HydratedDocument, Types } from 'mongoose';
import { Schema, model } from 'mongoose'
import mongoose, { Document } from 'mongoose';

export interface IProduct {  //Shape of my Schema
    name: string;
    unitPrice: number;
    category: string;
    isAvailable: boolean;
    imageUrl: string;
    purchaseQty: number;

}


// Full Mongoose document: has _id, save(), etc.
export type ProductDocument = HydratedDocument<IProduct>;

// Result of .lean(): plain object, no methods. It Takes the porpeties of IProduct plus _id, createdAt and updatedAt which werre all added autnatically in my datas
export type ProductLean = IProduct & {
    _id: Types.ObjectId;
    createdAt: Date; // added by { timestamps: true }
    updatedAt: Date;
};



//STATICS METHODS

// "My Product model is a normal Mongoose Model, but it also has a custom function called findProducts."
interface ProductModel extends mongoose.Model<IProduct> {
    findProducts(category: string): Promise<IProduct[]> // Promises to return an array of IProduct
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    isAvailable: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        required: true
    },

    purchaseQty: {
        type: Number,
        default: 1
    },
   


}, { timestamps: true })




//Static Methods

//1.

productSchema.statics.findProducts = function (category: string) {
    console.log("Custom function activated. Categry wey enter na", category)
    if (category === "all") {
        console.log("Oya Na")
        return this.find({ isAvailable: true })
    }
    return this.find({ category, isAvailable: true })
}





export const productModel = model<IProduct, ProductModel>('Product', productSchema);