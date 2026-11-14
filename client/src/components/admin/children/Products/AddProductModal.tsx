import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

import AddProductForm from './AddProductForm';
import AddCategoryForm from './AddCategoryForm';


interface EditProps {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}

type Tab = "product" | "category";

export default function AddProductModal({ onClose }: EditProps) {



    const queryClient = useQueryClient()
   
    const tabClass = (tab: Tab) =>
        `flex-1 py-2 text-sm font-medium cursor-pointer border-b-2 transition ${activeTab === tab
            ? "border-custom-gold text-custom-gold"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`;

    const [activeTab, setActiveTab] = useState<Tab>("product");








    return createPortal(
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,15,15,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
            onClick={() => onClose(false)}
        >

            <div className=' bg-white p-4 rounded-2xl w-full max-w-100' onClick={(e) => e.stopPropagation()}>

                <div className='flex justify-between mb-8 items-center'>
                    <h2 className='font-semibold text-xl'>Add New</h2>
                    <button onClick={() => onClose(false)}
                        style={{ background: "#f8fafc", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        ✕
                    </button>
                </div>

                {/* tab buttons */}
                <div className="mt-2 flex">
                    <button className={tabClass("product")} onClick={() => setActiveTab("product")}>
                        Add Product
                    </button>
                    <button className={tabClass("category")} onClick={() => setActiveTab("category")}>
                        Add Category
                    </button>
                </div>

                {/* Edit Form */}

                <div className="p-5">
                    {activeTab === "product" ? (

                       <AddProductForm  onClose={onClose}/>


                    ) : (
                        <AddCategoryForm onClose={onClose}  />
                    )}
                </div>


            </div>




        </div>, document.body
    );
}

