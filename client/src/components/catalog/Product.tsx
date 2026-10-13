import React, { useCallback, useState } from 'react'
import { ErrorBoundary } from "react-error-boundary"
import ProductTab from './ProductTab'
import { useTestFetchProducts } from '../../hooks/clientApi'
import ProductCard from './ProductCard'

interface Tabs {
  name: string,
  value: string
}

const categoryTabs: Tabs[] = [
  { name: "All", value: '' },
  { name: "Electronics", value: 'Electronics' },
  { name: "Home & Kitchen", value: 'Home & Kitchen' },
  { name: "Audio", value: 'Audio' },
  { name: "Apparel", value: 'Apparel' },
  { name: "Origo", value: 'Origo' },
  { name: "Bulely", value: 'bulely' },
  { name: "Material", value: 'material' },
  { name: "Sokoto", value: 'sokoto' },
  { name: "Bundle", value: 'bundle' },
  { name: "Tira", value: 'tira' },
  { name: "Crole", value: 'crole' },
  { name: "Batinga", value: 'batinga' },
  { name: "Pore", value: 'pore' },


]

export default function Product() {
  //Set Category key
  const [fetchCategory, setFetchCategory] = useState<string>("")
  const [page, setPage] = useState<number>(1);

  console.log("Page number is ",)

  //Fecth Test Products

  const { data: testProducts, isLoading, isError, error, refetch } = useTestFetchProducts(fetchCategory, page)


  //Handles Tab changes
  const handleCategoryChange = useCallback((newCategory: string) => {
    setFetchCategory(newCategory);
    setPage(1);
  }, [])


  // handle


  const handlePrevPagination = () => {
    if (page <= 1) {
      setPage(1)
      return
    }
    setPage((p) => p - 1)
  }





  return (

    <section className='py-10  mt-5 scroll-mt-10' id='catalog'>
      <div className={`container ${isLoading ? 'min-h-[200px]' : ''}`}>
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold  tracking-wide text-gray-900 text-center ">
            Product Catalogue
          </h2>
          <p className="text-sm text-center leading-tight text-gray-600">
            Review your selected items
          </p>

        </div>
        {/*Tabs */}
        {/*Desktop Tab */}
        <div className='pt-2 hidden lg:flex gap-7  overflow-x-auto md:flex-wrap md:overflow-visible md:gap-y-2.5
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >'>
          {categoryTabs.map((item) => (
            <ProductTab key={item.name} name={item.name} value={item.value} onCategoryChange={handleCategoryChange} activeCategory={fetchCategory} />
          ))}

        </div>

        {/*Mobile Tab */}
        <div className='pt-2 lg:hidden'>

          <nav className="relative mb-4 after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:w-10 after:bg-gradient-to-r after:from-transparent after:to-white after:pointer-events-none md:after:hidden">
            <div
              className="flex gap-2 overflow-x-auto px-4 py-2
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categoryTabs.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleCategoryChange(item.value)}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full border transition-colors
                      ' text-neutral-600 border-gray-300  hover:bg-custom-gold  hover:text-white hover:border-custom-gold
                       ${fetchCategory === item.value ? 'bg-custom-gold text-white border-custom-gold' : 'text-gray-500 border-gray-300'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

        </div>

        {/*Products  Display*/}
        <div className=' mt-4 py-6  '>
          {
            isLoading ? (
              <div>
                Loading jooro rore.......
              </div>
            ) : isError ? (
              <div>Fialed to load | {error?.message}
                <button
                  onClick={() => refetch()}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition'
                >
                  Try Again
                </button>

              </div>

            )
              : testProducts?.data.products.length === 0 ?
                (<div className='text-sm text-gray-500 text-center'>No items in this category</div>)
                :
                (
                  <div className=''>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                      {testProducts?.data.products?.map((eachProduct) => (
                        <ProductCard key={eachProduct._id} product={eachProduct} />
                      ))}
                    </div>


                    {/* Nav bars*/}
                    <div className='mt-8 text-center flex justify-between'>
                      <div>
                        <button onClick={() => setPage((p) => p - 1)} disabled={!testProducts?.data.pagination.hasPrevPage}
                          className={`text-sm px-2 py-1   ml-2 rounded-sm bg-custom-gold text-white ${!testProducts?.data.pagination.hasPrevPage ? " cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                          Prev
                        </button>
                        <button onClick={() => setPage((p) => p + 1)}
                          className={`text-sm px-2 py-1  ml-2 rounded-sm bg-custom-gold text-white ${!testProducts?.data.pagination.hasNextPage ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                          disabled={!testProducts?.data.pagination.hasNextPage}>Next</button>
                      </div>

                       <p className='text-sm'>Page {page} of {testProducts?.data.pagination.totalPages}</p>

                    </div>

                   

                  </div>
                )

          }

        </div>

      </div>
    </section>

  )
}
