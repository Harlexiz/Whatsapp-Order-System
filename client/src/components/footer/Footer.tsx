import React, { Component } from 'react'


export default function Footer() {
    return (
        <footer className='bg-deep-indigo py-4'>
            <div className="container flex items-center justify-center flex-col gap-2">
                <h1 className='text-white font-bold text-xl'>Asoebi Hub</h1>


                {/* Bottom */}
                <div className=" border-gray-800  text-center text-sm text-gray-500 w-full">
                    © {new Date().getFullYear()} Asoebi Hub. All rights reserved.
                </div>
            </div>


        </footer>
    )
}


