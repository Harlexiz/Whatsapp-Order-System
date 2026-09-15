
interface CartItem {
    _id: string,
    name: string,
    unitPrice: number,
    description: string,
    category: string,
    purchaseQty: number,
    isAvailable: boolean,
    image?: string,
    // reviewNeeded?: boolean
}




export const products: CartItem[] = [
  {
    _id: "66bc90e2f1a23b456789abc1",
    name: "Wireless Ergonomic Mouse",
    unitPrice: 29.99,
    description: "2.4GHz silent optical mouse with adjustable DPI and contoured grip.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/mouse.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc2",
    name: "Mechanical Gaming Keyboard",
    unitPrice: 79.50,
    description: "RGB backlit mechanical keyboard with tactile blue switches.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/keyboard.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc3",
    name: "Stainless Steel Water Bottle",
    unitPrice: 18.00,
    description: "Double-wall vacuum insulated 1-liter bottle keeps drinks cold for 24 hours.",
    category: "Home & Kitchen",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/water-bottle.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc4",
    name: "Noise-Canceling Headphones",
    unitPrice: 149.99,
    description: "Over-ear Bluetooth headphones with active noise cancellation and 30-hour battery life.",
    category: "Audio",
    purchaseQty: 1,
    isAvailable: true
  },
  {
    _id: "66bc90e2f1a23b456789abc5",
    name: "Cotton Crewneck T-Shirt",
    unitPrice: 12.50,
    description: "100% organic breathable cotton plain crewneck t-shirt.",
    category: "Apparel",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/tshirt.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc6",
    name: "USB-C Hub Multiport Adapter",
    unitPrice: 34.99,
    description: "7-in-1 aluminum adapter with HDMI, SD card reader, and 3 USB 3.0 ports.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true
  },
  {
    _id: "66bc90e2f1a23b456789abc7",
    name: "Non-Stick Frying Pan",
    unitPrice: 24.95,
    description: "10-inch aluminum frying pan with durable non-stick granite coating.",
    category: "Home & Kitchen",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/frying-pan.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc8",
    name: "Adjustable Desk Lamp",
    unitPrice: 22.00,
    description: "Dimmable LED desk lamp with 5 color modes and built-in USB charging port.",
    category: "Office",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/desk-lamp.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc9",
    name: "Ergonomic Office Chair",
    unitPrice: 189.10,
    description: "High-back mesh chair with lumbar support and 3D adjustable armrests.",
    category: "Office",
    purchaseQty: 1,
    isAvailable: true
  },
  {
    _id: "66bc90e2f1a23b456789abca",
    name: "Portable Power Bank 20000mAh",
    unitPrice: 42.00,
    description: "High-capacity fast-charging power bank with dual USB outputs.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/powerbank.jpg"
  }
]