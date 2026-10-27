import bcrypt from 'bcryptjs';
import mongoose, { type HydratedDocument } from 'mongoose';
import { adminModel, type AdminData } from '../models/adminModel.js';
import { AppError } from '../utils/appError.js';

const COST: number = 12;
// Compared against when the email doesn't exist, so response time
// doesn't reveal whether an account is real.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', COST);

// Never send the password hash outside this file. admin.id is the string version of _id.
type MyAdmin = HydratedDocument<AdminData>

const toPublic = (admin: MyAdmin) => (
    {
        id: admin.id,
        email: admin.email
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

export async function getAdminById(id:string) {
    if (!mongoose.isValidObjectId(id)) return null; // avoids a cast error on malformed IDs
    const admin = await adminModel.findById(id);
    return admin ? toPublic(admin) : null;
}



// Create New Admin

export async function createAdmin(email: string, password: string, name: string) {
   
    if (password.length < 12) {
        throw new AppError('Password must be at least 12 characters', 400);
    }
    const adminExists = await adminModel.findOne({email: email.toLowerCase()})
    if (adminExists) {
        throw new AppError('Admin already exists', 409);
    }
    const passwordHash = await bcrypt.hash(password, COST);
    
    const admin = await adminModel.create({ email, passwordHash, name });
    return toPublic(admin);
}