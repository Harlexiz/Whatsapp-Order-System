import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
import type { CartItem } from "../store/cartStore";
import type { AxiosError } from "axios";


// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


interface ApiResponse<T> {
    data: T
}

interface AuthResponse {
    id: string,
    email: string,
    name: string,
    role: string
}

// const queryClient = useQueryClient();


//Fetch Current Admin User
export const useCurrentUser = () => {
    return useQuery<ApiResponse<AuthResponse>>({
        queryKey: ['current-user'],
        queryFn: async () => {
            const response = await api.get<ApiResponse<AuthResponse>>('/admin/auth/me')
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 5
    })
}



//Login

type Credentials = {
    email: string,
    password: string
}
type ErrorResponse = {
    error?: string;
    message?: string;
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<AuthResponse>, AxiosError<ErrorResponse>, Credentials>({
        mutationFn: async ({ email, password }) => {
            const response = await api.post<ApiResponse<AuthResponse>>('/admin/auth/login', { email, password })
            return response.data
        },
        onSuccess: async (data) => {
            // // THIS na the one wey tell your app say user don login
            queryClient.setQueryData(['current-user'], data);
            // await queryClient.invalidateQueries({queryKey:['current-user']})  /// This is also an option
        },
    });
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return api.post('/admin/auth/logout')
        },
        onSuccess: () => {
            queryClient.clear()
            queryClient.setQueryData(['current-user'], null)
        }
    })
}

//Update Admin profile

export const useUpdateProfile = () => {
    
    return useMutation<{ message: string }, AxiosError<{ message: string }>, { name: string, email: string }>({
        mutationFn: async ({ name, email }) => {
            const response = await api.patch<{ message: string }>('/admin/auth/update-profile', { name, email })
            return response.data
        },

    })

}


//Update Admin password

interface PasswordCredentials {
    currentPassword : string,
    newPassword:  string,
    confirmPassword: string
}

export const useUpdatePassword = () => {
   
    return useMutation<{ message: string }, AxiosError<{ message: string }>, PasswordCredentials>({
        mutationFn: async ({ currentPassword, newPassword, confirmPassword }) => {
            const response = await api.patch<{ message: string }>('/admin/auth/update-password', { currentPassword, newPassword, confirmPassword })
            return response.data
        },

    })

}




//PRODUCTS


//Fetch Products 
interface Product {
    products: CartItem[],
    pagination: {
        totalPages: number,
        hasNextPage: boolean,
        hasPrevPage: boolean
    }
}

export const useFetchAdminProducts = (category: string | null, pageNo: number, limit: number, isAvailable: boolean, search: string) => {
    return useQuery<ApiResponse<Product>>({
        queryKey: ['admin-products', category, search, pageNo, isAvailable],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Product>>(`/admin/product/all-products`, {
                params: { category, pageNo, limit, isAvailable, search }
            })
            return response.data  // Represents the whole backend reponse 
        },
        refetchOnWindowFocus: false,
        staleTime: 0.5 * 60 * 1000,
        refetchInterval: 0.5 * 60 * 1000,
        refetchIntervalInBackground: false// ENsures no background refecth when component is not active
    })
}


// Edit Products
type ProductDetails = {
    name: string,
    unitPrice: number,
    category: string,
    isAvailable?: boolean
}

export const useEditProduct = (id: string) => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: async ({ name, unitPrice, category, isAvailable }: ProductDetails) => {
            const response = await api.put(`/admin/product/edit-product/${id}`, { name, unitPrice, category, isAvailable })
            return response.data
        }
    })
}



//Delete Product

export const useDeleteProduct = (productID: string) => {

    return useMutation({
        mutationFn: async () => {
            const response = await api.delete(`/admin/product/delete-product`, {
                data: { productID }
            })
        },
    })
}


// Get Dashboard stats 

interface Stats {
    completedOrders: number,
    totalProducts: number;
    availableProducts: number;
    unavailableProducts: number;
}

export const useDashboardStats = () => {
    return useQuery<ApiResponse<Stats>>({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Stats>>("/admin/product/stats");
            return response.data
        },
    });
};


// Add Product

export const useAddProduct = () => {

    return useMutation({
        mutationFn: async ({ name, unitPrice, category }: ProductDetails) => {
            const response = await api.post(`/admin/product/add-product`, { name, unitPrice, category })
            return response.data
        }
    })
}



// Add Product



interface CategoryDetails {
    name: string,
    description: string
}


interface CategoryResponse {
    message: string
}
export const useAddCategory = () => {

    return useMutation<CategoryResponse, AxiosError<{ message: string }>, CategoryDetails>({
        mutationFn: async ({ name, description }) => {
            const response = await api.post<CategoryResponse>(`/category/add-category`, { name, description })
            return response.data
        }
    })
}


