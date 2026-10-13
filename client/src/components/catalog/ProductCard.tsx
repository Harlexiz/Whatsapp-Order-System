import { useState } from 'react'
import { useCartStore, type CartItem } from '../../store/cartStore'
import { useShallow } from 'zustand/shallow'
import myImg from '../../../src/images/spec.jpg'

interface ProductCardProps {
    product: CartItem;
}


export default function ProductCard({ product }: ProductCardProps) {
    // const { addBtn, productList, clearBtn } = useCartStore((
    //     useShallow((state) => ({
    //         addBtn: state.addToCart,
    //         productList: state.products,
    //         clearBtn: state.clearCart
    //     }))
    // ))

    const addBtn = useCartStore((state)=> state.addToCart)
    const [isEnlarged, setIsEnlarged] = useState<boolean>(false);
   
   
   
    return (
        <>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col">
                {/* Image */}
                <button
                    onClick={() => setIsEnlarged(true)}
                    className="aspect-4/4 w-full overflow-hidden bg-neutral-100 cursor-zoom-in group"
                >
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </button>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1 flex-1">
                    <h3 className="text-sm font-medium text-neutral-900 line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-sm text-neutral-500">
                        ₦{product.unitPrice.toLocaleString()}
                    </p>

                    <button
                        onClick={() => addBtn(product)}
                        className="mt-2 w-full cursor-pointer py-2 text-sm font-medium rounded-md bg-custom-gold text-white  active:scale-[0.98] transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>



            {/* Lightbox */}
            {isEnlarged && (
                <div
                    onClick={() => setIsEnlarged(false)}
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
                >
                    <button
                        onClick={() => setIsEnlarged(false)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
                        aria-label="Close"
                    >
                        X
                    </button>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-[500px] object-cover rounded-md max-w-[600px]"
                    />
                </div>

            )}

        </>
    )
}
