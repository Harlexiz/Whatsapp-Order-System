import React from 'react'

interface ToggleProps {
    isAvailable:  boolean | null,
    changeAvailability: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Toggle({isAvailable, changeAvailability}: ToggleProps) {
    return (

        <div className="flex items-center gap-3 mb-4">
            <button
                type="button"
                role="switch"
                aria-label="Product availability"
                onClick={() => changeAvailability(!isAvailable)}
                className={`relative cursor-pointer h-6 w-11 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 ${isAvailable ? "bg-custom-gold" : "bg-stone-300"
                    }`}
            >
                <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${isAvailable ? "translate-x-5" : "translate-x-0"
                        }`}
                />
            </button>
            <span className="text-sm text-stone-700">
                {isAvailable ? "Available" : "Unavailable"}
            </span>


        </div>
    )
}
