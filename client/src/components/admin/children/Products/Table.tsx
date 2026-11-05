import React, { useState } from 'react'
import { createPortal } from 'react-dom'

import { Pencil, Trash2 } from 'lucide-react'
import type { CartItem } from '../../../../store/cartStore';




const headers: string[] = ["Product", "Category", "Unit Price", "Status", "Actions"];



interface TableProps {
    productData: CartItem[],
    setEditingProduct: (product: CartItem) => void,
    setDeleteProduct: () => void,
    setDeleteID: (id: string) => void
}

export default function Table({ productData, setEditingProduct, setDeleteProduct, setDeleteID }: TableProps) {





    return (
        <div className="w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 mt-10">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="whitespace-nowrap px-4 py-3 font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {productData.length > 0 ?
                        (
                            productData.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-3">{item.name}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{item.category}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{item.unitPrice}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {item.isAvailable ?
                                            (<p className=' bg-green-200 text-green-700 p-1 text-xs rounded-full text-center'>Available</p>) :
                                            (<p className=' bg-red-200 text-red-700 p-1 text-xs rounded-full text-center'>Not Available</p>)}

                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <div className="flex  gap-2">
                                            {/* Edit Button*/}
                                            <button
                                                type="button"
                                                onClick={() => setEditingProduct(item)}
                                                // aria-label={`Edit ${p.name}`}
                                                className="inline-flex h-8 items-center cursor-pointer gap-1.5 rounded-md border border-stone-300 px-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                                            >
                                                <Pencil size={13} aria-hidden="true" />
                                                Edit
                                            </button>

                                            {/*Delete Button */}
                                            <button
                                                type="button"

                                                // aria-label={`Delete ${p.name}`}
                                                className="inline-flex h-8 items-center cursor-pointer gap-1.5 rounded-md border border-red-200 px-2.5 text-xs font-medium text-red-700 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                                            >
                                                <Trash2 size={13} aria-hidden="true" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))

                        ) :

                        ((
                            <tr>
                                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
                                    No products found
                                </td>
                            </tr>
                        )
                        )



                    }

                </tbody>
            </table>


        </div>

    )
}
