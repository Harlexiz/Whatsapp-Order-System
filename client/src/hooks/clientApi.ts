import { useMutation, useQuery } from "@tanstack/react-query";
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
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false// ENsures no background refecth when component is not active

  })
}


export const useTestFetchProducts = (category: string) => {
  return useQuery<ApiResponse<Product>>({
    queryKey: ['test-products', category],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Product>>(`/products/my-products?category=${category}`)
      return response.data  // Represents the whole backend reponse 
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false// ENsures no background refecth when component is not active
  })
}






//Mutations


//=>  Verify Cart

interface VerificationData {
  _id: string;
  unitPrice: number;
  purchaseQty: number;
}



interface ApiResponse<T> {
  data: T
}


interface VerificationResponse {
  needsReview: boolean,
  verifiedItems: CartItem[],
  priceChanges: CartItem[],
  nonExistentItems: number
}

export const useVerifyCart = () => {
  return useMutation({
    mutationFn: async (cartProducts: VerificationData[]) => {
      const response = await api.post<ApiResponse<VerificationResponse>>('/products/verify-cart', { cartProducts })
      return response.data
    },

  })
}