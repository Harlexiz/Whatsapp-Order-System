import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { useUpdatePassword } from '../../../../hooks/adminQuery'
import { toast } from 'react-toastify'


interface PasswordField {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}



export default function Password() {

    const queryClient = useQueryClient()
    const { mutate, isPending } = useUpdatePassword()

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<PasswordField>({
        mode: 'all'
    })

    // Watch new password field to confirm correct password
    const userNewPassword = watch('newPassword')

    const [oldPassword, showOldPassword] = useState<boolean>(false)
    const [newPassword, showNewPassword] = useState<boolean>(false)
    const [confirmPassword, showConfirmPassword] = useState<boolean>(false)


    const updatePassword = async (data: PasswordField) => {
        // console.log(data)

        const { confirmPassword, currentPassword, newPassword } = data

        mutate({ confirmPassword, newPassword, currentPassword }, {
            onSuccess: (data) => {
                toast.success(data?.message || "Profile Updated")
                reset()
            },
            onError: (error) => {
                const message = error.response?.data?.message || "Login Failed";
                toast.error(message)
                console.log("The Message is ", message)
            }
        })
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(updatePassword)}>


            {/* Old Password */}
            <div className="h-16 mb-5">
                <label className='text-sm block mb-1'>Old Password</label>
                <div className='border border-gray-300 flex items-center px-4 rounded-lg'>
                    <FaLock className='text-gray-200' />
                    <input
                        id='password'
                        type={oldPassword ? 'text' : 'password'}
                        placeholder="Enter old  password"
                        className="w-full px-4 py-3 text-sm  rounded-lg outline-0  focus:outline-0"
                        {...register('currentPassword', {
                            required: "Old Password is required"
                        })}

                    />
                    <button type='button'
                        onClick={() => showOldPassword((p) => !p)} className='cursor-pointer text-gray-200'>
                        {oldPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.currentPassword && <p className='text-red-400 text-[0.6rem]  px-4'>{errors.currentPassword.message}</p>}
            </div>


            {/* New Password */}
            <div className="h-16 mb-5">
                <label className='text-sm block mb-1' htmlFor='newPassword'>New Password</label>
                <div className='border border-gray-300 flex items-center px-4 rounded-lg'>
                    <FaLock className='text-gray-200' />
                    <input
                        id='newPassword'
                        type={newPassword ? 'text' : 'password'}

                        placeholder="Enter new password"
                        className="w-full px-4 py-3 text-sm  rounded-lg outline-0  focus:outline-0  "
                        {...register('newPassword', {
                            required: "Enter new password"
                        })}

                    />
                    <button type='button'
                        onClick={() => showNewPassword((p) => !p)} className='cursor-pointer text-gray-200'>
                        {newPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.newPassword && <p className='text-red-400 text-[0.6rem]  px-4'>{errors.newPassword.message}</p>}
            </div>

            {/* Confirm New Password */}
            <div className="h-16 mb-5">
                <label className='text-sm block mb-1' htmlFor='confirmPassword'>Confirm Password</label>
                <div className='border border-gray-300 flex items-center px-4 rounded-lg'>
                    <FaLock className='text-gray-200' />
                    <input
                        id='confirmPassword'
                        type={confirmPassword ? 'text' : 'password'}

                        placeholder="Confirm password"
                        className="w-full px-4 py-3 text-sm  rounded-lg outline-0  focus:outline-0  "
                        {...register('confirmPassword', {
                            required: "Confirm new password",
                            validate: (value) => value === userNewPassword || 'Passwords do not match',
                        })}

                    />
                    <button type='button'
                        onClick={() => showConfirmPassword((p) => !p)} className='cursor-pointer text-gray-200'>
                        {confirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.confirmPassword && <p className='text-red-400 text-[0.6rem] mt-1 px-4'>{errors.confirmPassword.message}</p>}
            </div>




            {/* Button */}
            <div className='flex justify-end'>
                <button
                    type="submit"
                    disabled={isPending}
                    className=" bg-custom-gold text-white text-sm py-2 rounded-lg  transition p-2 mt-4 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isPending ? 'Please Wait' : 'Update Password'}
                </button>
            </div>
        </form>
    )
}
