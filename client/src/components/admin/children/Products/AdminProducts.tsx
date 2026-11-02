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
import EditModal from './EditModal';
import { useFetchAdminProducts } from '../../../../hooks/adminQuery';
import type { CartItem } from '../../../../store/cartStore';
import Pagination from './Pagination';

export default function AdminProducts() {
  // Search

  const [category, setCategory] = useState<string>("")
  const [available, setAvailable] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1);


  const [editingProduct, setEditingProduct] = useState<CartItem | null>(null)

  const [deleteProduct, setDeleteProduct] = useState(false)
  const [productToDeleteID, setProductToDeleteID] = useState(null)


  //Fetch products from server
  const limit: number = 8
  const { data: product, isLoading: productIsLoading, isError } = useFetchAdminProducts(category, page, limit, available)





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


      <div>
        <h1 className='text-center my-10'></h1>

        {/*Products Table */}
        <div style={{ overflowX: "auto" }}>
          {productIsLoading ?

            (
              <div className='flex items-center justify-center flex-col gap-1.5'>
                <div
                  className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-custom-gold"
                  role="status"
                  aria-label="Loading"
                >
                </div>
                <p className='text-gray-500 text-sm'>Loading...</p>
              </div>
            )
            : isError ?
              (
                <div>Erorrroror</div>
              )

              : (
                <Table
                  productData={product?.data?.products ?? []} // ?? is a fallback used when result is null or undefined
                  setEditingProduct={setEditingProduct}
                  setDeleteProduct={setDeleteProduct}
                  setDeleteID={setProductToDeleteID}
                />
              )}



          {/*Pagination buttons */}

          { (product?.data?.products?.length ?? 0) > 0  &&
            <Pagination
            page={page}
            setPage={setPage}
            totalPages={product?.data.pagination.totalPages ?? 0}
            hasNextPage={product?.data.pagination.hasNextPage ?? false}
            hasPrevPage={product?.data.pagination.hasPrevPage ?? false} />
          }

        </div>
      </div>



      {/*Edit Modal */}
      {
        editingProduct && (
          <EditModal
            product={editingProduct}
            onClose={setEditingProduct}
          />
        )
      }




    </section>
  )
}
