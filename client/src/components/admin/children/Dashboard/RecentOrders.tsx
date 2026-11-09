import React from 'react'
import { Link } from 'react-router-dom';





type statusType = {
    Completed: string,
    Pending: string,
    Cancelled: string
}
const statusStyles: statusType = {
    Completed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Cancelled: "bg-rose-50 text-rose-700",
};

type StatusType = keyof typeof statusStyles;


interface myOrders {
    id: string,
    customer: string,
    product: string,
    total: string,
    status: StatusType
}
const orders: myOrders[] = [
    { id: "#ORD-1052", customer: "Adaeze Okafor", product: "Wireless headphones", total: "$89.00", status: "Completed" },
    { id: "#ORD-1051", customer: "Tunde Bello", product: "Leather backpack", total: "$120.00", status: "Pending" },
    { id: "#ORD-1050", customer: "Chiamaka Eze", product: "Desk lamp", total: "$45.50", status: "Completed" },
    { id: "#ORD-1049", customer: "Ibrahim Musa", product: "Mechanical keyboard", total: "$135.00", status: "Cancelled" },
    { id: "#ORD-1048", customer: "Folake Adeyemi", product: "Water bottle", total: "$18.00", status: "Completed" },
];




export default function RecentOrders() {
    return (
        <section aria-label="Recent orders" className="rounded-lg border border-slate-200 bg-white mt-8">
            <div className='flex justify-between items-center px-5 py-4 '>
                <h2 className="border-b border-slate-200 text-base font-semibold text-slate-900">
                    Recent orders
                </h2>
                <Link to={'/admin/order'} className='text-sm text-blue-500'>View All</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="text-slate-500">
                        <tr>
                            {["Order", "Customer", "Product", "Total", "Status"].map((h) => (
                                <th key={h} scope="col" className="px-5 py-3 font-medium">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.map((o) => (
                            <tr key={o.id}>
                                <td className="px-5 py-3 font-medium text-slate-900">{o.id}</td>
                                <td className="px-5 py-3 text-slate-700">{o.customer}</td>
                                <td className="px-5 py-3 text-slate-700">{o.product}</td>
                                <td className="px-5 py-3 text-slate-700">{o.total}</td>
                                <td className="px-5 py-3">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[o.status]}`}>
                                        {o.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
