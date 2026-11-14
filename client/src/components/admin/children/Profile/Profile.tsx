import React, { useState } from 'react'
// import PersonalInfo from './PersonalInfo'
// import Password from './Password'
import { FaUser, FaUserAlt } from 'react-icons/fa'





const profileNavs = ["Personal Info", "Password"]
export default function Profile() {

    // const { user } = useCurrentUser()

    const user = {
        name: "Alex",
        email: "alexanderoke21@gmail.com",
        role: "Admin"
    }

    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className='max-w-175 rounded-lg border border-gray-300 mx-auto'>
            <div className="flex flex-wrap items-center gap-5 p-4 border-b border-gray-300">
                {/* Avatar */}
                <div className="relative shrink-0">

                    <div className="size-25 rounded-full bg-slate-800 flex items-center justify-center shadow-lg shadow-amber-400/10">
                        <span className=" text-4xl font-bold text-white tracking-tight">
                            <FaUserAlt />
                        </span>
                    </div>

                    {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0b0c0e]" /> */}
                </div>

                <div className=' '>
                    <h1 className="text-xl font-semibold  tracking-tight">{user.name}</h1>
                    <p className="text-sm mt-0.5">{user.email}</p>
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-amber-400/20">
                        {/* <ShieldIcon />  */}
                        <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>

            <div className=' mb-4 flex border-b border-gray-300'>
                {profileNavs.map((p, i) => {
                    return <button key={i} onClick={() => setActiveTab(i)}
                        className={` px-6 py-4 text-sm font-medium transition  cursor-pointer ${activeTab === i ? ' border-b-2 border-black text-black  ' : 'text-gray-500 hover:text-black'}`}
                    >
                        {p}
                    </button>
                })}

            </div>

            {/* Panels */}
            <div className='p-4'>
                <div className="flex items-center gap-3 mb-5 text-blue-500">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        {activeTab === 0 ? 'Profile Details' : 'Change Password'}
                    </span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>
                {/* {activeTab === 0 && <PersonalInfo name={user.name} email={user.email} />}
                {activeTab === 1 && <Password />} */}
            </div>
        </div>
    )
}

