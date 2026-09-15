import { useShallow } from 'zustand/shallow'
import { useCartStore, type CartItem } from '../../store/cartStore'
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'


interface CartListProps {
    product: CartItem
}
export default function CartList({ product }: CartListProps) {

    const { removeBtn, increaseQty, decreaseQty } = useCartStore(
        useShallow((state) => ({
            removeBtn: state.removeFromCart,
            increaseQty: state.increaseQty,
            decreaseQty: state.decreaseQty
        }))
    )


    return (
        <li key={product._id} className={`flex gap-4 py-5 sm:gap-6  mb-4 p-4 shadow-md`}>
            {/*Product Image */}
            <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 flex-none object-cover sm:h-24 sm:w-24"
            />

            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate font-medium leading-snug">
                            {product.name}
                        </p>
                        <p className="mt-0.5 text-sm text-[#6B6558]">
                            Category
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

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-[#E4E0D8]">
                        <button
                            onClick={() => decreaseQty(product._id)}
                            aria-label="Decrease quantity"
                            className="cursor-pointer flex h-8 w-8 items-center justify-center text-[#6B6558] transition-colors hover:bg-[#EFEBE3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5B45]"
                        >
                            <FaMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {product.purchaseQty}
                        </span>
                        <button
                            onClick={() => increaseQty(product._id)}
                            aria-label="Increase quantity"
                            className="cursor-pointer flex h-8 w-8 items-center justify-center text-[#6B6558] transition-colors hover:bg-[#EFEBE3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5B45]"
                        >
                            <FaPlus className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <p className="text-sm font-medium tabular-nums">
                        N{product.unitPrice}
                    </p>
                </div>
            </div>

        </li>
    )
}
