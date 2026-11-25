import React from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateProfile } from '../../../../hooks/adminQuery'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'



interface ProfileDetails {
    name: string,
    email: string,
}

export default function PersonalInfo({ name, email }: ProfileDetails) {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useUpdateProfile()


    const { register, handleSubmit, formState: { errors } } = useForm<ProfileDetails>({
        defaultValues: {
            name,
            email
        }
    })

    const submitUpdatedProfile = async (data: ProfileDetails) => {
       
        mutate({ name: data.name, email: data.email }, {
            onSuccess: (data) => {
                toast.success(data?.message || "Profile Updated")
                queryClient.invalidateQueries({ queryKey: ['current-user'] })
            }
        })
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit(submitUpdatedProfile)}>
            {/* Full Name */}
            <div>
                <label className="block mb-1 font-normal text-sm">
                    Full Name
                </label>

                <input
                    type="text"
                    {...register("name", {
                        required: "Full name is required",
                    })}
                    
                    className="w-full text-sm border  border-gray-300  rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-custom-gold"
                    placeholder="Enter full name"
                />

                {errors.name && (
                    <p className="text-red-500 text-[0.6rem] mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block mb-1 font-normal text-sm">
                    Email
                </label>

                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                    
                    className="w-full border border-gray-300 text-sm rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-custom-gold"
                    placeholder="Enter email"
                />

                {errors.email && (
                    <p className="text-red-500 text-[0.6rem] mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Button */}
            <div className='flex justify-end'>
                <button
                    type="submit"
                    disabled={isPending}
                    className=" bg-custom-gold text-white text-sm py-2 rounded-lg  transition p-2 mt-4 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isPending ? 'Please Wait...' : " Update Profile"}
                </button>
            </div>
        </form>
    )
}
