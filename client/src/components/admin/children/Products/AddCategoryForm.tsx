import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddCategory } from '../../../../hooks/adminQuery'
import { queryClient } from '../../../../utils/api'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'react-error-boundary'
import type { AxiosError } from 'axios'



interface FormFields {
    category_name: string,
    description: string
}

export default function AddCategoryForm({ onClose }: { onClose: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>()

    const { mutate, isPending } = useAddCategory()




    const submitNewCategory = ({ category_name, description }: FormFields) => {
        console.log(category_name)
        mutate({
            name: category_name,
            description
        }, {
            onSuccess: (data) => {
                console.log("Succes start")
                queryClient.invalidateQueries({ queryKey: ['all-categories'] })
                toast.success(data.message)
                onClose(false)
            },
            onError: (error: AxiosError<{ message: string }>) => {
                const message = error.response?.data?.message || "Something went wrong";

                toast.error(message);
            }




        }

        )
    }

    return (
        <form onSubmit={handleSubmit(submitNewCategory)}>
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Category Name</p>
                <input
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 12, fontFamily: "inherit", color: "#0f172a", outline: "none", transition: "border-color 0.15s" }}
                    {...register("category_name", { required: "Category name is required." })}
                    placeholder="e.g. Electronics"
                />
                {errors.category_name && <p className='text-[0.6rem] text-red-600'>{errors.category_name.message}</p>}
            </div>

            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>description</p>
                <input
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 12, fontFamily: "inherit", color: "#0f172a", outline: "none", transition: "border-color 0.15s" }}
                    {...register("description", { required: "Add a description" })}
                    placeholder="e.g. Home of elctronics"
                />
                {errors.description && <p className='text-[0.6rem] text-red-600'>{errors.description.message}</p>}
            </div>

            <button type="submit"
                disabled={isPending}

                style={{

                    flex: 2, padding: "11px", borderRadius: 10, border: "none",

                    color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", transition: "background 0.2s"
                }} className={`bg-custom-gold mt-4 w-full cursor-pointer disabled:cursor-not-allowed`}>

                {isPending ? 'Adding...' : 'Add Category'}
            </button>
        </form>
    )
}
