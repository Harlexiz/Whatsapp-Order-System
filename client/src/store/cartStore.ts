import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { toast } from 'react-toastify'



export interface CartItem {
    _id: string,
    name: string,
    unitPrice: number,
    description: string,
    category: string,
    purchaseQty: number,
    isAvailable: boolean,
    image?: string,
    oldPrice?: number,
    priceChanged?: boolean,
    // reviewNeeded?: boolean
}


type AcknowledgementOption = "keep" | "discard";

interface CartState {
    products: CartItem[],
    ommittedItems: number,
    priceChanges: boolean,
    priceChangeCount: number,
    addToCart: (product: CartItem) => void,
    removeFromCart: (productID: string) => void,
    clearCart: () => void,
    getCartValue: () => number,
    increaseQty: (productID: string) => void,
    decreaseQty: (productID: string) => void,
    acknowledgeChanges: (option: AcknowledgementOption) => void,
    keepItem: (productID: string) => void

}




export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            products: [],

            ommittedItems: 0,
            priceChanges: false,
            priceChangeCount: 0,

            // ADD  PRODUCT TO CART
            addToCart: (product) => {
                set((state) => {

                    // First Check if Cart is full
                    if (state.products.length >= 8) {
                        toast.error("Cart is Full")
                        console.log("This block eexucted")
                        return state
                    }

                    // Was product passed and if it does, does it have an id?
                    if (!product || !product._id || !product.isAvailable) {
                        console.warn('Invalid product passed to addToCart:', product);
                        toast.error("Invalid products")
                        return state
                    }

                    //Check if product exists in the cart
                    const productExists = state.products.find((item) => item._id === product._id)
                    if (!productExists) {
                        toast.success("Item Added to Cart")
                        return {
                            products: [...state.products, product],
                            ommittedItems: 0

                        };
                    } else {
                        toast.error("Item already in cart")
                        return state
                    }


                    return state;
                })
            },


            // REMOVE PRODUCT FROM CART
            removeFromCart: (productID) => {
                set((state) => {
                    //Gets products that have different ids. This filters out the id of the product we intend removing
                    if (!productID) {
                        console.warn('Invalid productID passed');
                        return state
                    }
                    const latestProducts = state.products.filter((product) => product._id !== productID)
                    return {
                        products: latestProducts,
                        ommittedItems: 0
                    }
                })
            },


            //CLEAR CART ORDERS
            clearCart: () => {
                set({
                    products: [],
                    ommittedItems: 0,
                    priceChanges: false
                })
            },

            //GET CART VALUE

            // Only calculate the price of items that are available
            getCartValue: () => {
                const total = get().products.reduce(
                    (acc, eachProduct) =>
                        eachProduct.isAvailable ? acc + (eachProduct.unitPrice * eachProduct.purchaseQty) : acc,
                    0
                );
                return Math.round(total * 100) / 100;
            },

            // Increment Product Quantity in the cart
            increaseQty: (productID) => {

                set((state) => {
                    //Gets products that have different ids. This filters out the id of the product we intend removing
                    if (!productID) {
                        console.warn('Invalid productID passed');
                        return state
                    }
                    const products = state.products.map((item) => item._id === productID ? { ...item, purchaseQty: item.purchaseQty + 1 } : item)

                    return {
                        products
                    }
                })

            },
            decreaseQty: (productID) => {
                set((state) => {
                    //Gets products that have different ids. This filters out the id of the product we intend removing
                    if (!productID) {
                        console.warn('Invalid productID passed');
                        return state
                    }
                    const products = state.products.map((item) => item._id === productID ?
                        { ...item, purchaseQty: item.purchaseQty <= 1 ? 1 : item.purchaseQty - 1 }

                        : item)

                    return {
                        products
                    }
                })

            },

            // Acknowledged CHnages in cart after cart validation
            acknowledgeChanges: (option) => {
                set((state) => {
                    if (option === "keep") {
                        const myProducts = state.products.map(({ priceChanged, oldPrice, ...rest }) => {
                            if (priceChanged) {
                                return rest
                            }
                            return rest
                        })

                        return {
                            products: myProducts,
                            priceChanges: false,
                            priceChangeCount: 0
                        }

                    } else {

                        const myProducts = state.products.filter((eachProduct) => {
                            if (!eachProduct.priceChanged) {
                                return eachProduct
                            }

                        })
                        return {
                            products: myProducts,
                            priceChanges: false, 
                            priceChangeCount: 0
                        }

                    }


                })
            },

            keepItem: (productID) => {
                set((state) => {
                    let wasChanged = false
                    const myProducts = state.products.map((eachProduct) => {
                        if (eachProduct._id === productID) {
                            if ("oldPrice" in eachProduct && "priceChanged" in eachProduct) {
                                wasChanged = true
                            }
                            const { oldPrice, priceChanged, ...rest } = eachProduct
                            return rest
                        }
                        return eachProduct
                    })
                    const newCount = wasChanged && state.priceChangeCount > 0
                        ? state.priceChangeCount - 1
                        : state.priceChangeCount

                    return {
                        products: myProducts,
                        priceChangeCount: newCount,
                        priceChanges: state.priceChangeCount > 0
                       
                    }
                })
            }


        }),



        {
            name: 'cart-storages', // key in localStorage
            partialize: (state) => ({ products: state.products }),
            onRehydrateStorage: () => (state) => {
                if (state?.products) {
                    state.products = state.products.filter(Boolean);  // Remove anything that is null, undefined, or otherwise falsy from the cart.
                }
            },
            storage: createJSONStorage(() => localStorage),
        }
    )
);




