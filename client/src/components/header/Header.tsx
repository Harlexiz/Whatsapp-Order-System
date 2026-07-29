import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

export default function Header() {
    return (
        <header className=' border-b border-[#e4dbc7] bg-[#f7f2e7] py-4.5 '>
            <div className='container flex justify-between items-center'>
                <h1 className='text-deep-indigo font-bold text-xl'>Ruby Fabrics</h1>
                <div className='flex items-center'>
                    <p className=' py-2.5 px-5 rounded-[30px] text-white font-semibold bg-deep-indigo text-sm'>View catalog</p>
                    <div className='relative ml-4 '>
                        <FaShoppingCart className='text-3xl' />
                        <p className='bg-red-600 text-xs  text-white absolute -top-1.5 -right-1.5 size-4 rounded-full  flex items-center justify-center '>1</p>
                    </div>
                </div>
            </div>

        </header>
    )
}
