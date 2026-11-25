import bcrypt from 'bcryptjs';
import mongoose, { type HydratedDocument } from 'mongoose';
import { adminModel, type AdminData } from '../models/adminModel.js';
import { AppError } from '../utils/appError.js';
import { productModel } from '../models/productModel.js';
import type { CartItem } from '../product.Data.js';

const COST: number = 12;
// Compared against when the email doesn't exist, so response time
// doesn't reveal whether an account is real.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', COST);

// Never send the password hash outside this file. admin.id is the string version of _id.
type MyAdmin = HydratedDocument<AdminData>

const toPublic = (admin: MyAdmin) => (
    {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
    }
);



export async function verifyCredentials(email: string, password: string) {

    const admin = await adminModel.findOne({ email: email.toLowerCase(), role: "admin" }); // Fetches admin

    const ok = await bcrypt.compare(password, admin ? admin.passwordHash : DUMMY_HASH); // CHecks if password matches 


    if (!admin || !ok) {
        throw new AppError('Invalid email or password', 401)
    };

    return toPublic(admin);
}


//Get Admin

export async function getAdminById(id: string) {
    if (!mongoose.isValidObjectId(id)) return null; // avoids a cast error on malformed IDs
    const admin = await adminModel.findById(id);
    return admin ? toPublic(admin) : null;
}



// Create New Admin

export async function createAdmin(email: string, password: string, name: string) {

    if (password.length < 12) {
        throw new AppError('Password must be at least 12 characters', 400);
    }
    const adminExists = await adminModel.findOne({ email: email.toLowerCase() })
    if (adminExists) {
        throw new AppError('Admin already exists', 409);
    }
    const passwordHash = await bcrypt.hash(password, COST);

    const admin = await adminModel.create({ email, passwordHash, name });
    return toPublic(admin);
}


//Update Admin Profile


export async function updateAdminProfileService(id: string, name: string, email: string) {

    if (!mongoose.isValidObjectId(id)) return null;

    const admin = await adminModel.findById(id)
    if (!admin) {
        throw new AppError('Admin not found', 404);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if another admin already uses this email
    const existingAdmin = await adminModel.findOne({
        email: normalizedEmail,
        _id: { $ne: admin._id }
    });

    if (existingAdmin) {
        throw new AppError("Email is already in use", 409);
    }

    admin.name = name.trim();
    admin.email = normalizedEmail;

    await admin.save();

}


//Update Admin Password

export async function updateAdminPassword(id: string, currentPassword: string, newPassword: string) {
    if (!mongoose.isValidObjectId(id)) return null;

    

    const admin = await adminModel.findById(id).select('+passwordHash')
    if (!admin) {
        throw new AppError('Admin not found', 404);
    }

    console.log("Admin is ", admin)

    //Check if password matches the current password tallies
    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash)
     
    if (!isMatch) {
        
        throw new AppError('Current password is incorrect', 403)
    }

    // Check if they are the same
    const isSame = await bcrypt.compare(newPassword, admin.passwordHash)

    
    if (isSame) {
        throw new AppError("Password must be different", 403)
    }

    // Hash new password 
    admin.passwordHash = await bcrypt.hash(newPassword, COST);
    await admin.save();

}




//PRODUCTS

//Add new product

interface NewProduct {
    name: string,
    category: string,
    unitPrice: number
}

export async function createProduct({ category, name, unitPrice }: NewProduct) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
        throw new AppError("Invalid Product ID", 400);
    }


    const newProduct = await productModel.create({
        name,
        category,
        unitPrice,
        imageUrl: "https://placehold.co/600x400?text=Bluetooth+Speaker"
    });

    return newProduct

}


// Edit Products

export async function updateProduct(id: string, productData: Partial<CartItem>) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError("Invalid Product ID", 400);
    }
    //Get product

    const result = await productModel.updateOne(
        { _id: id },
        { $set: productData },
        { runValidators: true }
    );


    console.log("The result is ", result)
    if (result.matchedCount === 0) {
        throw new AppError('Product Not Found', 404)
    }

}


//Delete Product

export async function deleteProduct(productID: string) {

    const product = await productModel.findByIdAndDelete(productID);

    if (!product) {
        return false
    }

    return true

}


// Get Stats

export async function getDashboardStatsService() {
    const [totalProducts, availableProducts, unavailableProducts,// completedOrders,
    ] = await Promise.all([
        productModel.countDocuments(),
        productModel.countDocuments({ isAvailable: true }),
        productModel.countDocuments({ isAvailable: false }),
        // Order.countDocuments({ status: "completed" }),
    ]);

    return {
        totalProducts,
        availableProducts,
        unavailableProducts,

    };

}


