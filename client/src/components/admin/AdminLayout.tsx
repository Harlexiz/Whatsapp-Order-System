import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Aside from './Aside'
import Body from './Body'
import AdminHeader from './Header';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
   
  };

  return (
    <div className='flex min-h-screen'>
      <div id="scrim" className={`fixed inset-0 z-40 ${isSidebarOpen ? '': 'hidden'}  bg-black/50 lg:hidden`} onClick={toggleSidebar}></div>
      <Aside isOpen={isSidebarOpen} />

      <main className="flex-1">
        {/*Header */}
        <AdminHeader toggleMenu={toggleSidebar} />

        <div className='py-10 min-h-screen px-4 sm:px-6'>
          <Outlet />
        </div>

      </main>
    </div>
  )
}
