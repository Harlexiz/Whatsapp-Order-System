import { Types } from 'mongoose'
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
  purchaseQty?: number,
  description?: string
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




export const productDataOne: Pro[] = [
  
  // ELECTRONICS
  {
    name: "Samsung 43-inch Smart TV",
    unitPrice: 350000,
    description: "43-inch Samsung Smart LED television with 4K display.",
    category: "6af293b0f014360e41404ffa",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Samsung+TV",
  },
  {
    name: "Wireless Bluetooth Speaker",
    unitPrice: 45000,
    description: "Portable Bluetooth speaker with quality sound and long battery life.",
    category: "6af293b0f014360e41404ffa",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Bluetooth+Speaker",
  },
  {
    name: "Oraimo Power Bank",
    unitPrice: 28000,
    description: "20000mAh portable power bank with fast charging support.",
    category: "6af293b0f014360e41404ffa",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Power+Bank",
  },
  {
    name: "Wireless Headphones",
    unitPrice: 35000,
    description: "Comfortable wireless headphones with noise isolation.",
    category: "6af293b0f014360e41404ffa",
    purchaseQty: 1,
    isAvailable: false,
    imageUrl: "https://placehold.co/600x400?text=Headphones",
  },
  {
    name: "USB-C Fast Charger",
    unitPrice: 12000,
    description: "25W USB-C fast charging adapter for compatible devices.",
    category: "6af293b0f014360e41404ffa",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Fast+Charger",
  },

  // CLOTHING
  {
    name: "Men's Polo Shirt",
    unitPrice: 12000,
    description: "Classic cotton polo shirt suitable for casual outings.",
    category: "6af293b0f014360e41404ffb",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Polo+Shirt",
  },
  {
    name: "Women's Casual Dress",
    unitPrice: 18500,
    description: "Beautiful casual dress suitable for everyday wear.",
    category: "6af293b0f014360e41404ffb",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Casual+Dress",
  },
  {
    name: "Men's Denim Jeans",
    unitPrice: 22000,
    description: "Comfortable slim-fit denim jeans for everyday use.",
    category: "6af293b0f014360e41404ffb",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Denim+Jeans",
  },
  {
    name: "Unisex Hoodie",
    unitPrice: 25000,
    description: "Soft cotton-blend hoodie with a front pocket.",
    category: "6af293b0f014360e41404ffb",
    purchaseQty: 1,
    isAvailable: false,
    imageUrl: "https://placehold.co/600x400?text=Hoodie",
  },
  {
    name: "Women's Leggings",
    unitPrice: 9500,
    description: "Stretchable leggings suitable for casual wear and exercise.",
    category: "6af293b0f014360e41404ffb",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Leggings",
  },

  // SPORTS
  {
    name: "Professional Football",
    unitPrice: 18000,
    description: "Durable size 5 football suitable for training and matches.",
    category: "6af293b1f014360e41404ffc",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Football",
  },
  {
    name: "Skipping Rope",
    unitPrice: 4500,
    description: "Adjustable skipping rope for cardio and fitness training.",
    category: "6af293b1f014360e41404ffc",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Skipping+Rope",
  },
  {
    name: "Yoga Mat",
    unitPrice: 12000,
    description: "Non-slip exercise mat suitable for yoga and stretching.",
    category: "6af293b1f014360e41404ffc",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Yoga+Mat",
  },
  {
    name: "Adjustable Dumbbells",
    unitPrice: 55000,
    description: "Adjustable dumbbell set for home strength training.",
    category: "6af293b1f014360e41404ffc",
    purchaseQty: 1,
    isAvailable: false,
    imageUrl: "https://placehold.co/600x400?text=Dumbbells",
  },
  {
    name: "Sports Water Bottle",
    unitPrice: 6500,
    description: "Reusable sports water bottle with leak-proof lid.",
    category: "6af293b1f014360e41404ffc",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Sports+Bottle",
  },

  // ACCESSORIES
  {
    name: "Leather Wrist Watch",
    unitPrice: 28000,
    description: "Stylish wristwatch with a classic leather strap.",
    category: "6af293b1f014360e41404ffd",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Wrist+Watch",
  },
  {
    name: "Classic Sunglasses",
    unitPrice: 8500,
    description: "Fashionable sunglasses with UV protection.",
    category: "6af293b1f014360e41404ffd",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Sunglasses",
  },
  {
    name: "Leather Wallet",
    unitPrice: 11000,
    description: "Compact leather wallet with multiple card slots.",
    category: "6af293b1f014360e41404ffd",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Leather+Wallet",
  },
  {
    name: "Fashion Backpack",
    unitPrice: 19500,
    description: "Spacious everyday backpack with multiple compartments.",
    category: "6af293b1f014360e41404ffd",
    purchaseQty: 1,
    isAvailable: false,
    imageUrl: "https://placehold.co/600x400?text=Backpack",
  },
  {
    name: "Baseball Cap",
    unitPrice: 7000,
    description: "Adjustable casual baseball cap for everyday styling.",
    category: "6af293b1f014360e41404ffd",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Baseball+Cap",
  },

  // HOME
  {
    name: "Electric Kettle",
    unitPrice: 22000,
    description: "1.7-litre electric kettle with automatic shut-off.",
    category: "6af293b1f014360e41404ffe",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Electric+Kettle",
  },
  {
    name: "Non-stick Frying Pan",
    unitPrice: 15000,
    description: "Non-stick frying pan suitable for everyday cooking.",
    category: "6af293b1f014360e41404ffe",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Frying+Pan",
  },
  {
    name: "Table Lamp",
    unitPrice: 12500,
    description: "Modern bedside table lamp with a soft lighting effect.",
    category: "6af293b1f014360e41404ffe",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Table+Lamp",
  },
  {
    name: "Laundry Basket",
    unitPrice: 8500,
    description: "Large lightweight laundry basket for household use.",
    category: "6af293b1f014360e41404ffe",
    purchaseQty: 1,
    isAvailable: false,
    imageUrl: "https://placehold.co/600x400?text=Laundry+Basket",
  },
  {
    name: "Kitchen Storage Set",
    unitPrice: 18000,
    description: "Set of airtight food storage containers for kitchen organization.",
    category: "6af293b1f014360e41404ffe",
    purchaseQty: 1,
    isAvailable: true,
    imageUrl: "https://placehold.co/600x400?text=Storage+Set",
  },
];
