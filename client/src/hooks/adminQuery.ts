import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
import type { CartItem } from "../store/cartStore";


// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


interface ApiResponse<T> {
    data: T
}

interface AuthResponse {
    id: string,
    email: string
}


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

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ email, password }: Credentials) => {
            const response = await api.post<ApiResponse<AuthResponse>>('/admin/auth/login', { email, password })
            return response.data
        },
        onSuccess: (data) => {
            // THIS na the one wey tell your app say user don login
            queryClient.setQueryData(['current-user'], data.data);
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

export const useFetchAdminProducts = (category: string | null, pageNo: number, limit: number, isAvailable: boolean) => {
    return useQuery<ApiResponse<Product>>({
        queryKey: ['admin-products', category, pageNo],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Product>>(`/admin/product/all-products`, {
                params: { category, pageNo, limit, isAvailable }
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
    isAvailable: boolean
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