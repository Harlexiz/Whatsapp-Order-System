import React from 'react'
import { useForm } from 'react-hook-form'
import { useCurrentUser, useLogin } from '../../hooks/adminQuery';
import { Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from "axios";
import { toast } from 'react-toastify';


interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {

    const { data: admin } = useCurrentUser()

    console.log("The Current Admin is ", admin)


    const {
        register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginFormData>({
            mode: "all"
        });

    const { mutate, isPending} = useLogin()


    //If user is alread logged in
    if (admin) {
        return <Navigate to="/admin" replace />
    }
    const onSubmit = (data: LoginFormData) => {
        console.log(data);

        // Call your login API here
        mutate({ email: data.email, password: data.password }, {
            onError: (error) => {
                const err = error as AxiosError<{ message: string }>;
                const message = err.response?.data?.message
                console.log("The Error Was ", message)
                toast.error(message)
            }
        })

    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 font-medium">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-custom-gold font-medium cursor-pointer text-white py-3 rounded-md
                      disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}








