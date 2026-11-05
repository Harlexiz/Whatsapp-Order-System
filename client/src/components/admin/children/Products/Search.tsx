import React from 'react'
import { Search } from 'lucide-react'


interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 flex-1">
            <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
                type="text"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full outline-none bg-transparent text-sm"
            />
        </div>
    )
}
