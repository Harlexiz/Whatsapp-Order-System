import React, { type Dispatch, type SetStateAction } from 'react'



interface Props {
    name: string,
    value: string,
    activeCategory: string,
    setCategory: Dispatch<SetStateAction<string>>
}


export default function ProductTab({ name, value, setCategory, activeCategory }: Props) {

    // For Desktop 
    return (
        <div>
            <button onClick={() => setCategory(value)}
                className={`relative shrink-0 whitespace-nowrap text-sm px-4 py-2   transition-colors duration-400 border cursor-pointer rounded-full hover:bg-custom-gold  hover:text-white hover:border-custom-gold
                
                    ${activeCategory ===  value ?  
                        'bg-custom-gold text-white border-custom-gold'
                        :
                        'text-gray-500 font-medium  border-gray-300'}
                `}>{name}</button>
        </div>
    )
}
