import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import type { CartItem } from "../store/cartStore";



interface ApiResponse<T> {
  data: T
}




interface Product {
  products: CartItem[]
}

export const useFetchAllProducts = () => {
  console.log("Query don dey fetch o")
  return useQuery<ApiResponse<Product>>({
    queryKey: ['all-products'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Product>>('/products/all-products')
      return response.data  // Represents the whole backend reponse 
    },
    refetchOnWindowFocus: false,
    staleTime: 0.5 * 60 * 1000,
    refetchInterval: 0.5 * 60 * 1000,
    refetchIntervalInBackground: false// ENsures no background refecth when component is not active

  })
}