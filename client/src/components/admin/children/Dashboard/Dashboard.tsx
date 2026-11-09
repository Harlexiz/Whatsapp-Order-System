import React from 'react'
import { Package, PackageCheck, PackageX, CheckCircle2, PlusCircle, ClipboardList } from "lucide-react";
import StatsCard from './StatsCard';
import RecentOrders from './RecentOrders';

const stats = [
    { label: "Total products", value: 248, icon: Package, tone: "bg-indigo-50 text-indigo-600" },
    { label: "Available products", value: 205, icon: PackageCheck, tone: "bg-emerald-50 text-emerald-600" },
    { label: "Non available", value: 43, icon: PackageX, tone: "bg-rose-50 text-rose-600" },
    { label: "Completed orders", value: 1284, icon: CheckCircle2, tone: "bg-amber-50 text-amber-600" },
];

export default function Dashboard() {
    return (
        <div className='min-h-screen flex flex-col gap-6'>
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>

            <div aria-label="Quick actions" className="flex flex-wrap gap-3 justify-end">
                <button
                    className="inline-flex items-center gap-2 rounded-md bg-custom-gold px-4 py-2.5 text-sm font-medium text-white cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusCircle size={18} aria-hidden="true" /> Add product
                </button>
                <button
                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <ClipboardList size={18} aria-hidden="true" /> View all orders
                </button>
            </div>

            {/*Stats */}
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {stats.map((s) => (
                    <StatsCard key={s.label} {...s} />
                ))}

            </div>

            {/*Recent Orders */}

            <RecentOrders />

        </div>
    )
}
