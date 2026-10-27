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

interface Product {
  products: CartItem[],
  pagination: {
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
  }
}

export const useTestFetchProducts = (category: string | null, pageNo: number) => {
  return useQuery<ApiResponse<Product>>({
    queryKey: ['test-products', category, pageNo],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Product>>(`/products/all-products`, {
        params: { category, pageNo }
      })
      return response.data  // Represents the whole backend reponse 
    },
    refetchOnWindowFocus: false,
    staleTime: 0.5 * 60 * 1000,
    refetchInterval: 0.5 * 60 * 1000,
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






interface VerificationResponse {
  needsReview: boolean,
  verifiedItems: CartItem[],
  priceChanges: CartItem[],
  nonExistentItems: number,
  orderID?: string
 
}

export const useVerifyCart = () => {
  return useMutation({
    mutationFn: async (cartProducts: VerificationData[]) => {
      const response = await api.post<ApiResponse<VerificationResponse>>('/products/verify-cart', { cartProducts })
      return response.data
    },

  })
}