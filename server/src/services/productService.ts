import { products, type CartItem } from "../product.Data.js";
import { productModel, type IProduct, type ProductDocument, type ProductLean } from "../models/productModel.js";
import mongoose, { type QueryFilter, type Types, Document } from "mongoose";
import { generateOrderId } from "../utils/generateOrderID.js";
import { AppError } from "../utils/appError.js";
import {categoryModel} from '../models/categoryModel.js'


interface ProductItem {
    _id: string,
    unitPrice: number,
    purchaseQty: number
}

export async function verifyCartService(productItems: ProductItem[]) {

    console.log("The products in the cart are ", productItems)

    // Step 1: fetch all products in one query
    const productIds = productItems.map((item) => item._id); // Get Product Ids
    // const allProducts = products.filter((product) => productIds.includes(product._id))
    const allProducts = await productModel.find({
        _id: { $in: productIds },
        isAvailable: true
    }).select("-createdAt -updatedAt -purchaseQty -__v").lean();




    // Map respective Product id to each product
    const productMap = new Map(allProducts.map(p => [p._id.toString(), p]));


    const verifiedItems: CartItem[] = []
    const removed: CartItem[] = [];
    const priceChanges: CartItem[] = [];
    let nonExistentItems: number = 0;


    let myItems: CartItem[] = []

    for (let eachItem of productItems) {


        // get product
        const product = productMap.get(eachItem._id)

        //Case1: Product does not exists or is not available
        if (!product || !product.isAvailable) {
            nonExistentItems += 1
            continue // Skip to next iteration
        }

        //Case2: Product exists but price changed

        const priceMatches: boolean = product?.unitPrice === eachItem.unitPrice // Check if price sent from frontend matches database price
        if (!priceMatches) {
            priceChanges.push({ ...product, purchaseQty: eachItem.purchaseQty, oldPrice: eachItem.unitPrice, priceChanged: true })
            continue
        }

        // Case 3: Surviving products should be pushed
        verifiedItems.push({ ...product, purchaseQty: eachItem.purchaseQty })
    }


    console.log("Verfied items after every ervey", verifiedItems)


    // Confirm if product needs review

    const needsReview = verifiedItems.length !== productItems.length

    let orderID: string | null = null;

    if (!needsReview) {
        //Generate order Id and save to backend
        orderID = generateOrderId()
    }

    console.log("Order ID generated ", orderID)

    return {
        verifiedItems,
        priceChanges,
        nonExistentItems,
        needsReview,
        orderID

    }


}











//Fetch Products by Category

export interface ProductFilter {
    pageNo?: number,
    category?: string | undefined,
    isAvailable?: boolean,
    limit?: number,
    skip?: number,
    search?: string

}

interface FetchProductReturn {
    products: ProductLean[],
    pagination: {
        totalPages: number,
        hasNextPage: boolean,
        hasPrevPage: boolean
    }
}


export async function fetchProductService({ category, pageNo = 1, isAvailable = true, limit = 6, skip = 0, search }: ProductFilter = {}): Promise<FetchProductReturn> { // I am promised a result whose blueprint is ProductLean


    //Partial ensures strict type based on the interface IProduct
    //QueryFilter allows arbitrary(random) properties
    const query: QueryFilter<IProduct> = { isAvailable };

   
    if (category !== undefined && category !== "") {
       

        if (!mongoose.isValidObjectId(category)) {
            throw new AppError("Invalid category ID format", 400);
        }

        const categoryExists = await categoryModel.exists({ _id: category });
        console.log("Category Exists", categoryExists)  
        if (!categoryExists) {
            throw new AppError("Category not found", 404);
        }

        query.category = new mongoose.Types.ObjectId(category);  // or query.category = categoryExists._id
    }


    if (search) {
        query.name = { $regex: search, $options: "i" }
    }



    console.log("Query After every ", query)

    //WHEN TO USE .lean()

    //1.Read - Only API Endpoints: When fetching data solely to render UI or send JSON responses(e.g., res.json(users)).

    //2. High - Volume Read Operations: Pagination, search results, or exporting large datasets.

    //3. Aggregations & Reports: Reading data where Mongoose model methods aren't required.

    // WHEN NOT TO USE .lean()
    //1. When you need to modify the document and call.save().

    //2.  When relying heavily on Mongoose middleware(hooks like pre('save')), getters, or custom instance methods.



    // Ensures the plain object have the shape of ProductLean

    const [myFetchedProducts, totalProducts] = await Promise.all([ // all helps me to run multiple request concurrently
        productModel.find(query).populate("category", "name").skip(skip).limit(limit).sort({createdAt: -1}).select("-createdAt -updatedAt -__v").lean<ProductLean[]>(),
        productModel.countDocuments(query)

    ])  // Runs both queries concurrently and if one request fails to resolve then all request fails

    const totalPages = Math.ceil(totalProducts / limit)
    return {
        products: myFetchedProducts,
        pagination: {
            totalPages,
            hasNextPage: pageNo < totalPages,
            hasPrevPage: pageNo > 1
        }
    }

}