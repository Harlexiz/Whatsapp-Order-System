import React from 'react'
import { useForm } from 'react-hook-form'
import { useFetchCategories } from '../../../../hooks/clientApi'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useAddProduct } from '../../../../hooks/adminQuery'


interface FormFields {
    productName: string,
    unitPrice: number,
    category: string
}
export default function AddProductForm({onClose}: {onClose: React.Dispatch<React.SetStateAction<boolean>>}) {
    const queryClient = useQueryClient()

    const { data: categories } = useFetchCategories()  // Fetch categories


    const { mutate, isPending } = useAddProduct()

    const submitUpdatedData = ({ category, productName, unitPrice }: FormFields) => {

        console.log(category, productName, Number(unitPrice))
        mutate({
            name: productName,
            category: category,
            unitPrice: Number(unitPrice)
        }, {
            onSuccess: async () => {
                await Promise.all([
                    queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
                    queryClient.invalidateQueries({ queryKey: ['all-products'] }),
                    queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })

                ])
                toast.success("Product Created Succefully")
                // onClose(false)
            },
            onError: () => {
                toast.error("Error Updating Product")
            }
        })
    }




    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        mode: 'all'
    })
    return (
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
                <select
                    style={{ fontSize: 12, width: "100%", border: "1.5px solid #e2e8f0", padding: "10px 14px" }}
                    {...register("category", { required: "Please select a category." })}>
                    <option value="">Select a category</option>
                    {categories?.data.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                {errors.category && <p className='text-[0.6rem] text-red-600'>{errors.category.message}</p>}
            </div>


            <button type="submit"
                disabled={isPending}
                style={{
                    flex: 2, padding: "11px", borderRadius: 10, border: "none",

                    color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", transition: "background 0.2s"
                }} className={`bg-custom-gold mt-4 w-full cursor-pointer disabled:cursor-not-allowed`}>

                {isPending ? 'Please Wait...' : " Add Product"}
            </button>

        </form>
    )
}
