import React, { useMemo, useState } from 'react'
import { useFetchAllProducts } from '../hooks/clientApi'
import { useShallow } from 'zustand/shallow'
import { useCartStore } from '../store/cartStore'





export default function Test() {

    const { addBtn, productList, clearBtn } = useCartStore((
        useShallow((state) => ({
            addBtn: state.addToCart,
            productList: state.products,
            clearBtn: state.clearCart
        }))
    ))




    //   const { productList, cartReconcilation } = useCartStore((
    //     useShallow((state) => ({
    //         productList: state.products,
    //         cartReconcilation: state.reconcileCart
    //     }))
    // ))

    const { data: myProducts, isLoading, isError, refetch } = useFetchAllProducts()



    if (isError) {
        return (
            <div className='bg-red-600 h-150'>
                <p>Something went wrong</p>
                <button className='bg-green-500 p-2' onClick={() => refetch()}>Refetch</button>
            </div>
        )
    }
    return (
        <div className='h-300 bg-teal-400 p-10'>
            Test Compnent




            <div className={`border-4 min-h-30 ${!isLoading ? 'grid grid-cols-3 gap-4' : ''}`}>
                {isLoading ? (
                    <div>Loading Products......</div>
                ) :
                    (
                        myProducts?.data.products.map((item) => (
                            
                             <div key={item._id} className='border h-30 bg-blue-500 text-white flex flex-col items-center justify-center'>
                                <p>{item.name}</p>
                                <p>{item.unitPrice}</p>
                                <button className='bg-black p-2 mt-2 cursor-pointer' onClick={() => addBtn(item)}>Add To Cart</button>

                            </div>
                        ))
                    )}

            </div>


            <div className='border bg-violet-600 mt-4 min-h-50'>
                <button className='p-4 bg-red-500 my-4' onClick={clearBtn}>Clear cart</button>
              



                {productList?.map((item) => (
                    <p key={item._id}>{item.name}</p>
                ))}
            </div>
        </div>
    )
}
