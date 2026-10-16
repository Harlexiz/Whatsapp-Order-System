import { useShallow } from 'zustand/shallow'
import { useCartStore, type CartItem } from '../../store/cartStore'
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'


interface CartListProps {
    product: CartItem
}
export default function CartList({ product }: CartListProps) {

    const { removeBtn, increaseQty, decreaseQty, keepItem } = useCartStore(
        useShallow((state) => ({
            removeBtn: state.removeFromCart,
            increaseQty: state.increaseQty,
            decreaseQty: state.decreaseQty,
            keepItem : state.keepItem
        }))
    )


    return (
        <li key={product._id} className={`border-b border-gray-200 flex gap-4 py-5 sm:gap-6  mb-4 p-4 shadow-md ${product.priceChanged ? 'bg-yellow-100' : ''}`}>
            {/*Product Image */}
            <img
                src={product.imageUrl}
                alt={product.name}
                className="h-20 w-20 flex-none object-cover sm:h-24 sm:w-24 text-xs flex items-center justify-center block bg-gray-300 rounded-md"
            />

            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate font-medium leading-snug text-sm">
                            {product.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#6B6558]">
                            {product.category}
                        </p>
                    </div>
                    <button
                        onClick={() => removeBtn(product._id)}
                        aria-label={`Remove ${product.name}`}
                        className="flex-none cursor-pointer rounded p-1 text-red-500 transition-colors hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5B45]"
                    >
                        <FaTrashAlt className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                    
                    <p className=" tabular-nums">
                        {product?.oldPrice && <span className='mr-3 line-through'> ₦{product?.oldPrice}</span>}
                         ₦{product.unitPrice}

                         {product?.oldPrice &&
                         <button onClick={()=>keepItem(product._id)}
                         className='text-xs cursor-pointer bg-gray-400 px-2 text-green-500 py-1 mx-2 rounded-full'>
                            Keep item
                        </button>}
                    </p>

                    <div className="flex items-center border border-[#E4E0D8]">
                        <button
                            onClick={() => decreaseQty(product._id)}
                            aria-label="Decrease quantity"
                            className="cursor-pointer flex h-8 w-8 items-center justify-center text-black transition-colors hover:bg-[#EFEBE3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5B45]"
                        >
                            <FaMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                            {product.purchaseQty}
                        </span>
                        <button
                            onClick={() => increaseQty(product._id)}
                            aria-label="Increase quantity"
                            className="cursor-pointer flex h-8 w-8 items-center justify-center text-black transition-colors hover:bg-[#EFEBE3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5B45]"
                        >
                            <FaPlus className="h-3.5 w-3.5" />
                        </button>
                    </div>


                </div>
            </div>

        </li>
    )
}
