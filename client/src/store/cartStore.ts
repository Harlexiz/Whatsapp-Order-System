import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { toast } from 'react-toastify'



export interface CartItem {
    _id: string,
    name: string,
    unitPrice: number,
    description: string,
    category: string,
    quantity: number,
    isAvailable: boolean,
    image?: string,
    // reviewNeeded?: boolean
}


interface CartState {
    products: CartItem[],
    addToCart: (product: CartItem) => void,
    removeFromCart: (productID: string) => void,
    clearCart: () => void,
    getCartValue: () => number,

    // getCartLength: () => void,

}




export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            products: [],

            // ADD  PRODUCT TO CART
            addToCart: (product) => {
                set((state) => {

                    // First Check if Cart is full
                    if (state.products.length >= 5) {
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
                            products: [...state.products, product]

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
                        products: latestProducts
                    }
                })
            },


            //CLEAR CART ORDERS
            clearCart: () => {
                set({ products: [] })
            },

            //GET CART VALUE

            // Only calculate the price of items that are available
            getCartValue: () => {
                const total = get().products.reduce(
                    (acc, eachProduct) =>
                        eachProduct.isAvailable ? acc + eachProduct.unitPrice : acc,
                    0
                );
                return Math.round(total * 100) / 100;
            },



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




