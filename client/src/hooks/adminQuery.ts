import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";


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
            const response = await api.get<ApiResponse<AuthResponse>>('/auth/me')
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

export const  useLogin = ()=> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({email, password}: Credentials) => {
            const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', { email, password })
            return response.data
        },
        onSuccess: (data) => {
            // THIS na the one wey tell your app say user don login
            queryClient.setQueryData(['current-user'], data.data);
        },
    });
}

export const useLogout = ()=>{
   const queryClient = useQueryClient();
   return useMutation({
    mutationFn: async ()=>{
        return api.post('/auth/logout')
    },
    onSuccess: ()=>{
        queryClient.clear()
        queryClient.setQueryData(['current-user'], null)
    }
   })
}
