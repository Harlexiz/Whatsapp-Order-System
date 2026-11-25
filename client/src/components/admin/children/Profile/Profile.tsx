import React, { useState } from 'react'
// import PersonalInfo from './PersonalInfo'
// import Password from './Password'
import { FaUser, FaUserAlt } from 'react-icons/fa'
import PersonalInfo from './PersonalInfo'
import Password from './Password'
import { useCurrentUser } from '../../../../hooks/adminQuery'





const profileNavs = ["Personal Info", "Password"]

export default function Profile() {

     const { data: user, isLoading } = useCurrentUser()

     console.log("user us ", user)
  
    
    const [activeTab, setActiveTab] = useState<number>(0)

    const setActiveStyle = activeTab ? 'text-red-600' : 'text-blue-600'

    return (
        <div className='max-w-175 rounded-lg border border-gray-300 mx-auto'>
            <div className="flex flex-wrap items-center gap-5 p-4 border-b border-gray-300">
                {/* Avatar */}
                <div className="relative shrink-0">

                    <div className="size-25 rounded-full bg-custom-gold flex items-center justify-center shadow-lg shadow-amber-400/10">
                        <span className=" text-4xl font-bold text-white tracking-tight">
                            <FaUserAlt />
                        </span>
                    </div>

                    {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0b0c0e]" /> */}
                </div>

                <div className=' '>
                    <h1 className="text-xl font-semibold  tracking-tight">{user?.data?.name}</h1>
                    <p className="text-sm mt-0.5">{user?.data?.email }</p>
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-amber-400/20">
                        {/* <ShieldIcon />  */}
                        <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">
                            { user?.data?.role }
                        </span>
                    </div>
                </div>
            </div>

            <div className=' mb-4 flex border-b border-gray-300'>
                {profileNavs.map((p, i) => {
                    return <button key={i} onClick={() => setActiveTab(i)}
                        className={` px-6 py-4 text-sm font-medium transition  cursor-pointer ${activeTab === i ? 'border-b-2  text-custom-gold' : 'text-gray-500 hover:text-black'}`}
                    >
                        {p}
                    </button>
                })}

            </div>

            {/* Panels */}
            <div className='p-4'>
                <div className="flex items-center gap-3 mb-5 text-custom-gold">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        {activeTab === 0 ? 'Profile Details' : 'Change Password'}
                    </span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>
                {
                    activeTab === 0 ?
                    (
                       <PersonalInfo name={user?.data?.name ?? ''} email={user?.data?.email ?? ''} />
                    ):
                    (
                        <Password />
                    )
                }
            </div>
        </div>
    )
}

