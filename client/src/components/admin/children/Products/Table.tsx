import React from 'react'

import {Pencil, Trash2} from 'lucide-react'



const headers: string[] = ["Name", "Email", "Role", "Status", "Actions"];

const rows = [
    { id: 1, name: "Ada Okafor", email: "ada@example.com", role: "Designer", location: "Lagos", status: "Active" },
    { id: 2, name: "Tunde Bello", email: "tunde@example.com", role: "Developer", location: "Abuja", status: "Pending" },
    { id: 3, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
    { id: 4, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
    { id: 5, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
    { id: 6, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
    { id: 7, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
    { id: 8, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
    { id: 9, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
    { id: 10, name: "Chioma Eze", email: "chioma@example.com", role: "Manager", location: "Enugu", status: "Active" },
];

export default function Table() {
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
                    {rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-4 py-3">{row.name}</td>
                            <td className="whitespace-nowrap px-4 py-3">{row.email}</td>
                            <td className="whitespace-nowrap px-4 py-3">{row.role}</td>
                            <td className="whitespace-nowrap px-4 py-3">{row.location}</td>
                            <td className="whitespace-nowrap px-4 py-3">
                                <div className="flex  gap-2">
                                    {/* Edit Button*/}
                                    <button
                                        type="button"
                                        
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
                    ))}
                </tbody>
            </table>
            {/*Pagination */}
           
        </div>

    )
}
