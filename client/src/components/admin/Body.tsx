import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './Header'

interface Props{
  toggleMenu: ()=>void
}
export default function Body({toggleMenu}:Props) {
  return (
    <main className="flex-1">
      {/*Header */}
      <AdminHeader />

      <div className='border-4 min-h-screen'>
        <Outlet />
      </div>





    </main>
  )
}
