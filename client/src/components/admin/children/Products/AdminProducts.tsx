import React, { useState } from 'react'
import {
  Search,
  Tag,
  CircleDollarSign,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
} from "lucide-react";
import Table from './Table';

export default function AdminProducts() {
  // Search

  const [category, setCategory] = useState<string>("")
  const [available, setAvailable] = useState<string>("")
  return (
    <section className="mx-auto w-full  rounded-xl  overflow-x-auto">

      Toolbar: search + two filters
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="search"

            placeholder="Search products by name"
            aria-label="Search products"
            className="h-10 w-full rounded-lg border border-stone-300 bg-white pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
          />
        </div>

        <div className="flex gap-2">
          {/* <FilterButton
            icon={Tag}
            label="Category"
            value={category}
            options={categories}
            onChange={resetPageThen(setCategory)}
          />

          <FilterButton
            icon={CircleDollarSign}
            label="Price"
            value={priceRange}
            options={PRICE_RANGES.map((r) => r.label)}
            onChange={resetPageThen(setPriceRange)}
          /> */}
          <button className='py-4 ml-4'>Category</button>
          <button className='py-4'>Price</button>
        </div>
      </div>


      <Table />


      {/*Pagination */}
      <div className='mt-4'>
        Page 1 of 20
      </div>



    </section>
  )
}
