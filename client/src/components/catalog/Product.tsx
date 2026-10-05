import React, { useState } from 'react'
import ProductTab from './ProductTab'
import { useTestFetchProducts } from '../../hooks/clientApi'
import ProductCard from './ProductCard'

interface Tabs {
  name: string,
  value: string
}

const categoryTabs: Tabs[] = [
  { name: "All", value: 'all' },
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
  const [fetchCategory, setFetchCategory] = useState<string>("all")

  //Fecth Test Products

  const { data: testProducts, isLoading } = useTestFetchProducts(fetchCategory)

  console.log("My fetxg cat is ", fetchCategory)
  return (
    <section className='py-10  mt-5 scroll-mt-10' id='catalog'>
      <div className={`container ${isLoading ? 'min-h-[200px]':''}`}>
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
            <ProductTab key={item.name} name={item.name} value={item.value} setCategory={setFetchCategory} activeCategory={fetchCategory} />
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
                  onClick={() => setFetchCategory(item.value)}
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
            )
              : testProducts?.data.products.length === 0 ?
                (<div className='text-sm text-gray-500 text-center'>No items in this category</div>)
                :
                (
                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {testProducts?.data.products.map((eachProduct) => (
                      <ProductCard key={eachProduct._id} product={eachProduct} />
                    ))}
                  </div>
                )

          }

        </div>
      </div>
    </section>
  )
}
