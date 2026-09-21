import { products, type CartItem } from "../product.Data.js";

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
            priceChanges.push({ ...product, purchaseQty:eachItem.purchaseQty, oldPrice: eachItem.unitPrice, priceChanged: true })
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