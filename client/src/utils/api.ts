import { QueryClient } from '@tanstack/react-query';
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
})

export const queryClient = new QueryClient()


api.interceptors.response.use(
    (response) => {
        // If request success, Pass response
        return response;
    },
    (error) => {
        const status = error.response?.status;
        const url: string = error.config?.url ?? '';

        // 401s are expected: "Trying to ge current user" and "wrong credentials"
        const isAuthCall = url.includes('/auth/me') || url.includes('/auth/login');

        
        if (status === 401 && !isAuthCall) {
            queryClient.clear();
            queryClient.setQueryData(['current-user'], null);

            const inAdmin = window.location.pathname.startsWith('/admin');
            if (inAdmin && window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);
export default api

