import { Trash } from 'lucide-react'
import React from 'react'
import { createPortal } from 'react-dom'
import { useDeleteProduct } from '../../../../hooks/adminQuery'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface DeleteProps {
    productID: string,
    closeDelete: React.Dispatch<React.SetStateAction<null | string>>
}

export default function DeleteModal({ closeDelete, productID }: DeleteProps) {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useDeleteProduct(productID)

    const confirmDeleteProduct = () => {

        mutate(undefined, {
            onSuccess: () => {
                toast.success("Delete Successful")
                queryClient.invalidateQueries({ queryKey: ['admin-products'] })
                closeDelete(null)
            }
        })
    }

    return createPortal(
        <div className='fixed inset-0 top-0 bottom-0 z-100 flex justify-center items-center'>
            <div className='bg-black/50 absolute inset-0 z-20' onClick={() => closeDelete(null)}></div>
            <div className='relative mx-4  z-100  rounded-lg'>

                <div className=' bg-white p-4  w-full max-w-100 rounded-lg'>
                    <div className='size-20 bg-red-100 mx-auto rounded-full flex items-center justify-center '>
                        <Trash className='text-red-600 text-2xl' />
                    </div>
                    <h2 className='font-semibold  mt-2 text-center'>Delete Product</h2>
                    <p className='text-xs text-center mt-2 text-gray-500'>Are you sure you want to delete this product?</p>

                    <div className='mt-6 flex gap-4'>
                        <button
                            className="border px-4 py-2 flex-1 text-xs rounded-md font-semibold cursor-pointer" onClick={() => closeDelete(null)}>
                            Cancel
                        </button>

                        <button
                            className='px-4 py-2 flex-1 bg-red-600 text-xs text-white rounded-md font-semibold cursor-pointer' onClick={confirmDeleteProduct}>
                            {isPending ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>

        </div>, document.body
    )
}
