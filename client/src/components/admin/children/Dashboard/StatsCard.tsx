import React from 'react'

interface StatsProps{
    icon: React.ElementType,
    label: string,
    value: number,
    tone: string
}

export default function StatsCard({ icon: Icon, label, value, tone}:StatsProps) {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${tone}`}>
                <span><Icon size={24} aria-hidden="true" /></span>
            </div>
            <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-2xl font-semibold text-slate-900">{value}</p>
            </div>
        </div>
    )
}
