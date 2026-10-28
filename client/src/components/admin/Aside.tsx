import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/adminQuery';
import { useQueryClient } from '@tanstack/react-query';


interface SideBar {
    path: string,
    label: string
}

const sideBarLinks: SideBar[] = [
    {
        path: '',
        label: 'Dashboard'
    },
    {
       path:'profile',
       label: 'Profile' 

    },
    {
        path: 'order',
        label: 'Orders'
    },
    {
        path: 'product',
        label: 'Products'
    }
]



interface Props {
    isOpen: boolean
}


export default function Aside({ isOpen }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate} = useLogout()


    const handleLogout = ()=>{
        mutate(undefined, {
            onSuccess:()=>{
                queryClient.clear() // clears all cached datas
                queryClient.setQueryData(['current-user'], null)

                navigate('/admin/login', {replace: true})
            }
        })
    }

    return (
        <aside
            id="sidebar"
            aria-label="Main navigation"
            className={` fixed inset-y-0 left-0 z-50  w-64 flex shrink-0 flex-col gap-1 overflow-y-auto bg-slate-800 p-4 text-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="px-2 py-3 text-lg font-bold text-white">Asoebi Admin</div>

            <nav className="mt-4 flex flex-col gap-1">
                {sideBarLinks.map(({ label, path }) => (
                    <NavLink
                        to={path === "" ? "/admin" : `/admin/${path}`}

                        key={label}
                        end={path === ""}
                        className={({ isActive }) => `${isActive ? "bg-custom-gold text-white  rounded-sm" : "text-white "}
                             p-2  my-2 block transition-colors  text-sm font-medium
                        `

                        }>{label}</NavLink>
                ))}
            </nav>

            <div className="mt-auto px-2 pt-6 text-xs">
                Signed in as Admin
            </div>


            <button onClick={handleLogout}
            className='flex items-center gap-2 px-2 cursor-pointer'>Logout <FaSignOutAlt /></button>

        </aside>
    )
}


