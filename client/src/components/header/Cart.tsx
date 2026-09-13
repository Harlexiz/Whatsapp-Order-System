import React, { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useCartStore } from '../../store/cartStore'
import { FaCartShopping } from 'react-icons/fa6'
import CartList from './CartList'





export default function Cart() {
    console.log("Adding joor o")

    const { productList, cartValue } = useCartStore((
        useShallow((state) => ({
            productList: state.products,
            cartValue: state.getCartValue
        }))
    ))
    // const cartValue = useMemo(() => {
    //     const total = productList.reduce(
    //         (acc, item) => (item.isAvailable ? acc + item.unitPrice : acc),
    //         0
    //     );
    //     return Math.round(total * 100) / 100;
    // }, [productList]);



    return (
        <section className=" bg-[#f7f2e7] absolute right-0 top-full w-full h-screen py-20 overflow-y-auto">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold  tracking-wide text-gray-900 ">
                        Cart
                    </h2>
                    <p className="text-sm  leading-tight text-gray-600">
                        Order in just a few simple steps
                    </p>

                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">

                    <div className={`md:col-span-9  h-[400px] ${productList.length === 0 ? ' border pt-15 rounded-md' : ''}`}>
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
                    </div>



                    {/*checkout */}
                    <div className="md:col-span-3  p-6 border rounded-md">
                        <h2 className="text-xl mb-6 font-semibold">Order Summary</h2>

                        <p className="mb-2 text-sm flex justify-between"><span className="font-semibold">Total Items</span>{productList.length}</p>
                        <p className="mb-2 text-sm flex justify-between"><span className="font-semibold">Total Items</span> ₦{cartValue().toFixed(2)}</p>


                        <button className="py-2 mt-4 bg-deep-indigo text-white rounded-md w-full cursor-pointer ">
                            Send Order
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
