import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PagProps {
    setPage: React.Dispatch<React.SetStateAction<number>>,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    page: number,
    totalPages: number
}
export default function Pagination({ page, setPage, totalPages, hasNextPage, hasPrevPage }: PagProps) {
    return (
        <div className='mt-8 text-center flex justify-between'>
            <div>
                <button disabled={!hasPrevPage} onClick={() => setPage(p => p - 1)}
                    className={`text-sm p-1 border   ml-2 rounded-sm  text-black ${!hasPrevPage ? " cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                    <ChevronLeft />
                </button>
                <button onClick={()=>setPage(p => p + 1)}
                    className={`text-sm p-1  ml-2 rounded-sm border text-black ${!hasNextPage ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    disabled={!hasNextPage}><ChevronRight /> 
                </button>
            </div>

            <p className='text-sm'>Page {page} of {totalPages}</p>

        </div>
    )
}
