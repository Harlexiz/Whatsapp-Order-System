import { products, type CartItem } from "../product.Data.js";
import { productModel, type IProduct, type ProductDocument, type ProductLean } from "../models/productModel.js";
import { type QueryFilter, type Types, Document } from "mongoose";

interface ProductItem {
    _id: string,
    unitPrice: number,
    purchaseQty: number
}

export async function verifyCartService(productItems: ProductItem[]) {

    console.log("The products in the cart are ", productItems)

    // Step 1: fetch all products in one query
    const productIds = productItems.map((item) => item._id); // Get Product Ids
    const allProducts = products.filter((product) => productIds.includes(product._id))


    // Map respective Product id to each product
    const productMap = new Map(allProducts.map(p => [p._id.toString(), p]));
    console.log(productMap)

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
            // if (product) {
            //     removed.push({
            //         ...product,
            //         isAvailable: false
            //     });
            // }
            continue // Skip to next iteration
        }

        //Case2: Product exists but price changed

        const priceMatches: boolean = product?.unitPrice === eachItem.unitPrice // Check if price sent from frontend matches database price
        if (product && !priceMatches) {
            priceChanges.push({ ...product, purchaseQty: eachItem.purchaseQty, oldPrice: eachItem.unitPrice, priceChanged: true })
            continue
        }

        // Case 3: Surviving products should be pushed
        verifiedItems.push({ ...product, purchaseQty: eachItem.purchaseQty })
    }


    // Confirm if product needs review

    const needsReview = verifiedItems.length !== productItems.length




    // await Product.find({ _id: { $in: productIds } });


    //   const productIds = items.map((item) => item.productId);

    //   const products = await Product.find({
    //     _id: { $in: productIds },
    //   });

    //   const validItems = products.filter(
    //     (product) => product.isAvailable
    //   );

    //   const needsReview =
    //     validItems.length !== items.length;

    //   return {
    //     validItems,
    //     needsReview,
    //   };

    return {
        verifiedItems,
        priceChanges,
        nonExistentItems,
        needsReview
    }
}


//Fetch All Products

export interface ProductFilter {
    pageNo?: number,
    category?: string | undefined,

}

interface FetchProductReturn {
    products: ProductLean[],
    pagination: {
        totalPages: number,
        hasNextPage: boolean,
        hasPrevPage: boolean
    }
}


export async function fetchProductService({ category, pageNo = 1}: ProductFilter = { }): Promise<FetchProductReturn> { // I am promised a result whose blueprint is ProductLean
    
    
    //Partial ensures strict type based on the interface IProduct
    //QueryFilter allows arbitrary(random) properties
    const query: QueryFilter<IProduct> = { isAvailable: true };

    // Business rule: "all" or no category means no category filter
    if (category && category !== "all") {
        console.log("Block Executed")
        query.category = category;
    }

    console.log(`Query is ${query[0]}`)

    //WHEN TO USE .lean()

    //1.Read - Only API Endpoints: When fetching data solely to render UI or send JSON responses(e.g., res.json(users)).

    //2. High - Volume Read Operations: Pagination, search results, or exporting large datasets.

    //3. Aggregations & Reports: Reading data where Mongoose model methods aren't required.

    // WHEN NOT TO USE .lean()
    //1. When you need to modify the document and call.save().

    //2.  When relying heavily on Mongoose middleware(hooks like pre('save')), getters, or custom instance methods.



    console.log("Page no before sub ", pageNo)
    let skip = (pageNo - 1) * 6;
    console.log("The value of skip is ", skip)
    // Ensures the plain object have the shape of ProductLean

    const [myFetchedProducts,   totalProducts] = await Promise.all([ // all helps me to run multiple request concurrently
        productModel.find(query).skip(skip).limit(6).lean<ProductLean[]>(),
        productModel.countDocuments(query)

    ])  // Runs both queries concurrently
    
    const totalPages = Math.ceil(totalProducts / 6)
    return {
        products: myFetchedProducts, 
        pagination: {
            totalPages,
            hasNextPage: pageNo < totalPages,
            hasPrevPage: pageNo > 1
        }
    }

}