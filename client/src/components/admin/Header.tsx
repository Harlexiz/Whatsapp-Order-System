import { useState } from "react";


interface Props {
    toggleMenu: () => void
}


export default function AdminHeader({ toggleMenu }: Props) {
    const [openMenu, setIsOpenMenu] = useState<boolean>(false)
    return (
        <header className="sticky top-0 z-30 flex justify-between  lg:justify-end gap-3 border-b border-gray-200 bg-white px-4 py-3  sm:px-6">
            <button
                onClick={toggleMenu}

                aria-label="Toggle navigation"
                aria-controls="sidebar"

                className="grid cursor-pointer h-9 w-9 place-items-center rounded-lg border text-gray   lg:hidden"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
            </button>




            <div
                onClick={() => setIsOpenMenu((p) => !p)}
                aria-label="Ada Okafor"
                className="grid h-9 w-9 place-items-center rounded-full bg-custom-gold text-sm font-bold text-white cursor-pointer"
            >
                AO
            </div>

            {openMenu && <div className="absolute right-8 px-8 py-2 bg-custom-gold top-[120%] rounded-lg flex flex-col gap-2">
                <p className="text-sm  text-white">Profile</p>
                <p className="text-sm  text-white">Logout</p>

            </div>}
        </header>
    );
}