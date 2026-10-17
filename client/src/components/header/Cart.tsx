import React, { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useCartStore, type CartItem } from '../../store/cartStore'
import { FaCartShopping } from 'react-icons/fa6'
import CartList from './CartList'
import { toast } from 'react-toastify'
import { useVerifyCart } from '../../hooks/clientApi'
import axios from 'axios'
import Footer from '../footer/Footer'


//Get the products details to send to backend
const prepareProductsForVerification = (productList: CartItem[]) => {
    return productList.map((item) => ({
        _id: item._id,
        unitPrice: item.unitPrice,
        purchaseQty: item.purchaseQty
    }))
}


// Cart reconcilation after verifying cart
const reconcileCart = (
    verifiedItems: CartItem[],
    priceChanges: CartItem[],
    nonExistentItems: number
) => {
    useCartStore.setState({
        products: [...priceChanges, ...verifiedItems],
        ommittedItems: nonExistentItems,
        priceChanges: priceChanges.length > 0,
        priceChangeCount: priceChanges.length
    })
}

const SELLER_NUMBER = "2348162846119"; // international format: no +, no spaces, no leading 0

const buildWhatsAppUrl = (orderID: string) => {

    const total = 2000;

    const message = `Hello, I'd like to place an order:\nTotal: ₦${total.toLocaleString()}\nOrder ID: ${orderID}`;
    //  const messag = `Hello, I'd like to place an order:\n\n${lines.join("\n")}\n\nTotal: ₦${total.toLocaleString()}`;


    return `https://wa.me/${SELLER_NUMBER}?text=${encodeURIComponent(message)}`;
};




export default function Cart() {
    console.log("Adding joor o")


    const { productList, cartValue, priceChanged, itemsRemovedAfterVerification, updateChanges, changeCount, clearCart } = useCartStore((
        useShallow((state) => ({
            productList: state.products,
            cartValue: state.getCartValue,
            priceChanged: state.priceChanges,
            itemsRemovedAfterVerification: state.ommittedItems,
            updateChanges: state.acknowledgeChanges,
            changeCount: state.priceChangeCount,
            clearCart: state.clearCart

        }))
    ))





    //=> Verify Cart order in the backend

    const { mutate, isPending, } = useVerifyCart()


    const verifyCart = () => {
        //Check if cart is empty
        if (productList.length === 0) {
            toast.error("Cart is empty")
            return
        }

        // Get Verifying data
        const productsToVerify = prepareProductsForVerification(productList)

        mutate(productsToVerify, {
            onSuccess: (data) => {
                const { verifiedItems, priceChanges, nonExistentItems, needsReview, orderID } = data.data
                console.log("The returend data ", data.data)
                reconcileCart(verifiedItems, priceChanges, nonExistentItems)

                //if cart needs review, cross check orders and see what changed else submit my order on whatsapp
                if (needsReview) {
                    toast.error("You no dey go anywhere")
                    return
                }
               
                if (!orderID) {
                    toast.error("Could not create your order, please try again");
                    return;
                }
                console.log
                toast.success(`Opening Whatssap ${orderID}`)
                window.location.href = buildWhatsAppUrl(orderID)
            },
            onError: (error) => {
                // toast.error(error.response?.data.message)
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.message)
                }
            },
            onSettled: () => {
                // Runs regardless of the outcome

            }
        })

        console.log("Products to verify", productsToVerify)
    }









    return (
        <section className=" bg-[#f7f2e7] absolute right-0 top-full w-full h-screen py-20 overflow-y-auto">
            <div className="container  mb-6">
                <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold  tracking-wide text-gray-900 ">
                        Your Cart
                    </h2>
                    <p className="text-sm  leading-tight text-gray-600">
                        Review your selected items
                    </p>

                </div>

                {/*Banner */}


                {itemsRemovedAfterVerification > 0 &&
                    <div className="bg-red-600 p-4 mt-4 text-center text-sm">
                        ⚠️ {itemsRemovedAfterVerification} item(s) removed

                    </div>
                }





                {/*Cart Lists */}

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">

                    <div className={`md:col-span-9 p-6  min-h-[400px]  border border-gray-300 rounded-lg ${productList.length === 0 ? ' border pt-15 rounded-md' : ''}`}>
                        {productList.length === 0 ?
                            (
                                <div className=" flex items-center justify-center flex-col ">

                                    <div className=' size-30 flex items-center justify-center rotate-12 rounded-full shadow-md'>
                                        <FaCartShopping className=" text-deep-indigo relative z-10 rotate-12 text-7xl  " />
                                    </div>


                                    <h2 className="text-2xl font-semibold my-2">Your Cart is <span className="text-red-600">Empty</span></h2>
                                    <p className="text-sm">You must add items to cart before sending order</p>
                                </div>
                            )
                            :
                            (
                                <ul className="h-full overflow-y-auto overscroll-contain" >
                                    {productList.map((eachProduct) => (
                                        <CartList key={eachProduct._id} product={eachProduct} />
                                    ))}
                                </ul>
                            )
                        }

                        {/*Clear cart button */}
                        {productList.length > 0 &&
                            <button onClick={clearCart}
                                className='mt-4 cursor-pointer bg-red-600 px-4 py-2 rounded-full text-white text-sm font-medium'>Clear Cart</button>
                        }

                        {/*Keep Discard button */}
                        {changeCount > 0 &&
                            <div className='mt-6 flex gap-2 items-center justify-end '>

                                <button className='p-3 cursor-pointer rounded-md border-gray-300 border text-sm' onClick={() => updateChanges("discard")}>
                                    Discard
                                </button>

                                <button onClick={() => updateChanges("keep")}
                                    className='p-3 bg-custom-gold text-white text-sm rounded-md cursor-pointer' >
                                    Keep Changes
                                </button>


                            </div>}
                    </div>



                    {/*checkout */}
                    <div className="md:col-span-3  p-6 border border-gray-300 rounded-md">
                        <h2 className="text-xl mb-6 font-semibold">Order Summary</h2>

                        <div className='border-b pb-2 border-gray-300'>
                            <p className="mb-2 text-sm flex justify-between text-gray-400">Total Items <span className='text-black font-semibold'>{productList.length}</span></p>
                            <p className="mb-2 text-sm flex justify-between text-gray-400">Value <span className='text-black font-semibold'> ₦{cartValue().toFixed(2)}</span></p>
                        </div>


                        <button disabled={isPending}
                            className={`px-2 py-2.5 mt-6 bg-custom-gold text-sm text-white rounded-full w-full ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={verifyCart}>
                            {isPending ? 'Verifying Cart...' : 'Send Order'}
                        </button>
                        {/* 
                        
                            1. Send Order
                            2. Send to backend
                            3. 


                            // Testing
                            1. send ordr
                            2. reconcile cart
                            3. if cart is still the same
                            4 Print something
                            5. else Pront another 
                        
                        
                        */}

                    </div>

                </div>




            </div>
        </section>
    )
}
