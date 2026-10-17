import {Types} from 'mongoose'
export interface CartItem {
  _id: string | Types.ObjectId,
  name: string,
  unitPrice: number,
  description?: string,
  category: string,
  purchaseQty?: number,
  isAvailable: boolean,
  image?: string,
  oldPrice?: number,
  priceChanged?: boolean
 
}





export const products: CartItem[] = [
  {
    _id: "66bc90e2f1a23b456789abc1",
    name: "Wireless Ergonomic Mouse",
    unitPrice: 25.99,
    description: "2.4GHz silent optical mouse with adjustable DPI and contoured grip.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/mouse.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc2",
    name: "Mechanical Gaming Keyboard",
    unitPrice: 77.50,
    description: "RGB backlit mechanical keyboard with tactile blue switches.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/keyboard.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc3",
    name: "Stainless Steel Water Bottle",
    unitPrice: 18.50,
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
    unitPrice: 15.50,
    description: "100% organic breathable cotton plain crewneck t-shirt.",
    category: "Apparel",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/tshirt.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc6",
    name: "USB-C Hub Multiport Adapter",
    unitPrice: 34.00,
    description: "7-in-1 aluminum adapter with HDMI, SD card reader, and 3 USB 3.0 ports.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true
  },
  {
    _id: "66bc90e2f1a23b456789abc7",
    name: "Non-Stick Frying Pan",
    unitPrice: 25.91,
    description: "10-inch aluminum frying pan with durable non-stick granite coating.",
    category: "Home & Kitchen",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/frying-pan.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc8",
    name: "Adjustable Desk Lamp",
    unitPrice: 25.80,
    description: "Dimmable LED desk lamp with 5 color modes and built-in USB charging port.",
    category: "Office",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/desk-lamp.jpg"
  },
  {
    _id: "66bc90e2f1a23b456789abc9",
    name: "Ergonomic Office Chair",
    unitPrice: 190.90,
    description: "High-back mesh chair with lumbar support and 3D adjustable armrests.",
    category: "Office",
    purchaseQty: 1,
    isAvailable: true
  },
  {
    _id: "66bc90e2f1a23b456789abca",
    name: "Portable Power Bank 20000mAh",
    unitPrice: 41.60,
    description: "High-capacity fast-charging power bank with dual USB outputs.",
    category: "Electronics",
    purchaseQty: 1,
    isAvailable: true,
    image: "https://example.com/images/powerbank.jpg"
  }
]




interface Pro {
  name: string,
  unitPrice: number,
  category: string,
  isAvailable: boolean,
  imageUrl: string,
  purchaseQty?: number
}



// seeders/productData.ts
export const productData: Pro[] = [
  // ---------------- Electronics ----------------
  {
    name: 'Wireless Bluetooth Earbuds',
    unitPrice: 15000,
    category: 'Electronics',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    
  },
  {
    name: 'Mechanical Gaming Keyboard',
    unitPrice: 25000,
    category: 'Electronics',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
  },
  {
    name: 'Portable Power Bank 20000mAh',
    unitPrice: 9500,
    category: 'Electronics',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1609592806596-4d1b5e5e7d68?w=500',
  },
  {
    name: 'Smart LED Desk Lamp',
    unitPrice: 7500,
    category: 'Electronics',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
  },
  {
    name: 'Noise Cancelling Headphones',
    unitPrice: 32000,
    category: 'Electronics',
    isAvailable: false,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    name: 'USB-C Multiport Hub',
    unitPrice: 11000,
    category: 'Electronics',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1587301810017-aaf5a7f3f6c0?w=500',
  },
  {
    name: 'Smartwatch Fitness Tracker',
    unitPrice: 28000,
    category: 'Electronics',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },

  // ---------------- Home ----------------
  {
    name: 'Stainless Steel Water Bottle',
    unitPrice: 4500,
    category: 'Home',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
  },
  {
    name: 'Non-Stick Frying Pan Set',
    unitPrice: 13500,
    category: 'Home',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1584990347163-0680f7f4fd3d?w=500',
  },
  {
    name: 'Scented Soy Candle Set',
    unitPrice: 6000,
    category: 'Home',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1602874801006-e26c4c5a0d5f?w=500',
  },
  {
    name: 'Memory Foam Pillow',
    unitPrice: 8500,
    category: 'Home',
    isAvailable: false,
    imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500',
  },
  {
    name: 'Ceramic Dinner Plate Set (6pc)',
    unitPrice: 17000,
    category: 'Home',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=500',
  },
  {
    name: 'Cotton Throw Blanket',
    unitPrice: 9000,
    category: 'Home',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=500',
  },
  {
    name: 'Indoor Plant Pot Set',
    unitPrice: 5500,
    category: 'Home',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
  },

  // ---------------- Sports ----------------
  {
    name: 'Yoga Mat (Non-Slip)',
    unitPrice: 7000,
    category: 'Sports',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
  },
  {
    name: 'Adjustable Dumbbell Set',
    unitPrice: 45000,
    category: 'Sports',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500',
  },
  {
    name: 'Resistance Bands Set',
    unitPrice: 5000,
    category: 'Sports',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-afd1a7a1b7e2?w=500',
  },
  {
    name: 'Football (Size 5)',
    unitPrice: 8500,
    category: 'Sports',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500',
  },
  {
    name: 'Running Shoes',
    unitPrice: 22000,
    category: 'Sports',
    isAvailable: false,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
  },
  {
    name: 'Skipping Rope (Speed Cable)',
    unitPrice: 3500,
    category: 'Sports',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=500',
  },
];