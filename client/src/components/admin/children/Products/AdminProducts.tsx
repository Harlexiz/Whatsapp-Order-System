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
  PackageCheck,
  PlusCircle,
  ClipboardList,
} from "lucide-react";
import Table from './Table';
import EditModal from './EditModal';
import { useFetchAdminProducts } from '../../../../hooks/adminQuery';
import type { CartItem } from '../../../../store/cartStore';
import Pagination from './Pagination';
import useDebounce from '../../../../utils/debounce';
import FilterButton, { type FilterOption } from './FilterButton';
import SearchInput from './Search';
import DeleteModal from './DeleteModal';







const categories: FilterOption[] = [
  { label: "All Categories", value: "" },
  { label: "Sports", value: "Sports" },
  { label: "Electronics", value: "Electronics" },
  { label: "Home & Kitchen", value: "Home" },
];

const availabilityOptions: FilterOption[] = [
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "not-available" },
];





export default function AdminProducts() {

  // Search
  const [searchKeyword, setSearchKeyword] = useState<string>("")

  const [category, setCategory] = useState<string>("")
  const [available, setAvailable] = useState<string>("available")
  const [page, setPage] = useState<number>(1);


  // Debounce query
  const debounceSearchValue = useDebounce(searchKeyword, 700)

  console.log("debounceing at ", debounceSearchValue)

  const [editingProduct, setEditingProduct] = useState<CartItem | null>(null)

  // const [deleteProduct, setDeleteProduct] = useState<boolean>(false)
  const [productToDeleteID, setProductToDeleteID] = useState<string | null>(null)

  //COnverts available to boolean
  const isAvailable = available === "available"

  console.log("Availability is ", productToDeleteID)

  //Fetch products from server
  const limit: number = 8
  const { data: product, isLoading: productIsLoading, isError } = useFetchAdminProducts(category, page, limit, isAvailable, debounceSearchValue)





  return (
    <section className="mx-auto w-full  overflow-x-auto">
      <h1 className="text-2xl font-semibold text-slate-900">Manage Products</h1>

      <div aria-label="Quick actions" className="flex flex-wrap gap-3 justify-end ">
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


      <div className="flex flex-col md:flex-row gap-3 w-full mt-6">
        <SearchInput
          value={searchKeyword}
          onChange={setSearchKeyword}
        />

        <FilterButton
          label="Category"
          options={categories}
          value={category}
          onChange={setCategory}
          icon={<Tag />}
        />

        <FilterButton
          label="Availability"
          options={availabilityOptions}
          value={available}
          onChange={setAvailable}
          icon={<PackageCheck />}
        />
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
                <div className='text-center'>Erorrroror</div>
              )

              : (
                <Table
                  productData={product?.data?.products ?? []} // ?? is a fallback used when result is null or undefined
                  setEditingProduct={setEditingProduct}
                  setDeleteID={setProductToDeleteID}
                />
              )}



          {/*Pagination buttons */}

          {(product?.data?.products?.length ?? 0) > 0 &&
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

      {/*Edit Modal */}
      {
        productToDeleteID && (
          <DeleteModal
            productID={productToDeleteID}
            closeDelete={setProductToDeleteID}
          />
        )
      }




    </section>
  )
}
