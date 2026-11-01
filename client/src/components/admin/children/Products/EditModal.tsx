import React from 'react'
import { createPortal } from 'react-dom';
import type { CartItem } from '../../../../store/cartStore';


interface EditProps {
    product: CartItem,
    onClose: () => void
}

export default function EditModal({ product, onClose }: EditProps) {
    console.log("Welcome to the products to Edit")
    return createPortal(
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,15,15,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
            onClick={onClose}
        >

            <div className=' bg-white p-4 rounded-2xl w-full max-w-120' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between mb-8'>
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Edit Product</p>
                        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{product.name}</h2>
                        
                    </div>
                    <button onClick={onClose} style={{ background: "#f8fafc", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
            </div>
        </div>, document.body
    );
}



