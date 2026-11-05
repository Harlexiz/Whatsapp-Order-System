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
import useDebounce from '../../../../utils/debounce';
import FilterButton, { type FilterOption } from './FilterButton';
import SearchInput from './Search';







const categories: FilterOption[] = [
  { label: "All Categories", value: "" },
  { label: "Sports", value: "Sports" },
  { label: "Electronics", value: "Electronics" },
  { label: "Home & Kitchen", value: "Home" },
];

const availabilityOptions: FilterOption[] = [
  { label: "Available", value: true },
  { label: "Unavailable", value: false },
];











export default function AdminProducts() {



  // Search
  const [searchKeyword, setSearchKeyword] = useState<string>("")

  const [category, setCategory] = useState<string>("")

  const [available, setAvailable] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1);


  //Handles Search Changes
  const handleSearchChange = (value: string) => {
    setSearchKeyword(value);
  };


  //Handles Category Chnages 
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  // Handles Availability Changes

  const handleAvailabilityChange = (value: boolean) => {
    setAvailable(value);

  };





  // Debounce query
  const debounceSearchValue = useDebounce(searchKeyword, 700)

  console.log("debounceing at ", debounceSearchValue)

  const [editingProduct, setEditingProduct] = useState<CartItem | null>(null)

  const [deleteProduct, setDeleteProduct] = useState(false)
  const [productToDeleteID, setProductToDeleteID] = useState(null)




  // const formatAvailability = ()
  //Fetch products from server
  const limit: number = 8
  const { data: product, isLoading: productIsLoading, isError } = useFetchAdminProducts(category, page, limit, available, debounceSearchValue)





  return (
    <section className="mx-auto w-full  overflow-x-auto">

      <div className="flex flex-col md:flex-row gap-3 w-full">
        <SearchInput
          value={searchKeyword}
          onChange={handleSearchChange}
        />

        <FilterButton
          label="Category"
          options={categories}
          value={category}
          onChange={handleCategoryChange}
        />

        <FilterButton
          label="Availability"
          options={availabilityOptions}
          value={available}
          onChange={handleAvailabilityChange}
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
                  setDeleteProduct={setDeleteProduct}
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




    </section>
  )
}
