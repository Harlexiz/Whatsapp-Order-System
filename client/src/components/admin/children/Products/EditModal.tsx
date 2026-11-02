import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import type { CartItem } from '../../../../store/cartStore';
import { useForm } from 'react-hook-form';
import Toggle from './Toggle';
import { useEditProduct } from '../../../../hooks/adminQuery';
import { toast } from 'react-toastify';
import { QueryClient, useQueryClient } from '@tanstack/react-query';


interface EditProps {
    product: CartItem,
    onClose: React.Dispatch<React.SetStateAction<CartItem | null>>
}

const CATEGORIES: string[] = [
    "Electronics", "Clothing",
    "Beauty", "Home", "Groceries"
];

export default function EditModal({ product, onClose }: EditProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            productName: product.name,
            unitPrice: product.unitPrice,
            category: product.category,
            isAvailable: product.isAvailable
        },
    });

    const [isAvailable, setIsAvailable] = useState<boolean>(product.isAvailable)

    
    const { mutate, isPending, isError } = useEditProduct(product._id)

    type FormData = {
        productName: string,
        unitPrice: number,
        category: string,
    }
    const submitUpdatedData = ({category, productName, unitPrice}:FormData) => {
       
        console.log(category, productName, Number(unitPrice))
        mutate({
          name: productName,
          isAvailable: isAvailable,
          category: category,
          unitPrice: Number(unitPrice)
        }, {
            onSuccess: async()=>{
                await Promise.all([
                    queryClient.invalidateQueries({queryKey: ['admin-products']})
                ])
                // queryClient.invalidateQueries({queryKey: ['admin-products']})
                toast.success("Updated")
                onClose(null) // Close Modal if update is successful 
            },
            onError:()=>{
                toast.error("Error Updating Product")
            }
        })
    }

    return createPortal(
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,15,15,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
            onClick={() => onClose(null)}
        >

            <div className=' bg-white p-4 rounded-2xl w-full max-w-100' onClick={(e) => e.stopPropagation()}>

                <div className='flex justify-between mb-8'>
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Edit Product</p>
                        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{product.name}</h2>

                    </div>
                    <button onClick={() => onClose(null)} style={{ background: "#f8fafc", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit(submitUpdatedData)}>
                    <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Product Name</p>
                        <input
                            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 12, fontFamily: "inherit", color: "#0f172a", outline: "none", transition: "border-color 0.15s" }}
                            {...register("productName", { required: "Product name is required." })}
                            placeholder="e.g. Indomie Noodles"
                        />
                        {errors.productName && <p className='text-[0.6rem] text-red-600'>{errors.productName.message}</p>}
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Unit Price</p>
                        <input
                            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 12, fontFamily: "inherit", color: "#0f172a", outline: "none", transition: "border-color 0.15s" }}
                            type="number"
                            step="0.01"
                            {...register("unitPrice", { required: "Unit price is required.", min: 0 })}
                            placeholder="0.00"
                        />
                        {errors.unitPrice && <p className='text-[0.6rem] text-red-600'>{errors.unitPrice.message}</p>}
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Category</p>
                        <select style={{ fontSize: 12, width: "100%", border: "1.5px solid #e2e8f0" }}
                            {...register("category", { required: "Please select a category." })}>
                            <option value="">Select a category</option>
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <p className='text-[0.6rem] text-red-600'>{errors.category.message}</p>}
                    </div>

                    <Toggle isAvailable={isAvailable} changeAvailability={setIsAvailable} />


                    {/* <button type="submit" disabled={isPending}
                        style={{
                            flex: 2, padding: "11px", borderRadius: 10, border: "none",

                            color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", transition: "background 0.2s"
                        }} className={`bg-blue-500 mt-4 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        {isPending ? 'Saving changes..' : 'Save Changes'}
                    </button> */}

                    <button type="submit"
                        style={{
                            flex: 2, padding: "11px", borderRadius: 10, border: "none",

                            color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", transition: "background 0.2s"
                        }} className={`bg-custom-gold mt-4 w-full cursor-pointer disabled:cursor-not-allowed`}>
                       
                       {isPending ? 'Saving Chnages' : " Save Changes"}
                    </button>

                </form>

            </div>




        </div>, document.body
    );
}



