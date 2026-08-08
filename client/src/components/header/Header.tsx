import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

export default function Header() {
    return (
        <header className=' border-b border-[#e4dbc7] bg-[#f7f2e7] py-4.5 sticky top-0 left-0 z-50'>
            <div className='container flex justify-between items-center'>
                <h1 className='text-deep-indigo font-bold text-xl'>Asoebi Hub</h1>
                <div className='flex items-center'>
                    
                    <div className='relative ml-4 '>
                        <FaShoppingCart className='text-3xl' />
                        <p className='bg-red-600 text-xs  text-white absolute -top-1.5 -right-1.5 size-4 rounded-full  flex items-center justify-center '>1</p>
                    </div>
                </div>
            </div>

        </header>
    )
}
