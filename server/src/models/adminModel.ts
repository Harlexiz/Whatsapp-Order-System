import { Schema, model } from 'mongoose'
import mongoose, { Document } from 'mongoose';



export type UserRole = "admin" | "user";

export interface AdminData {
    name: string,
    email: string,
    passwordHash: string,
    role: UserRole
}


// models/Admin.ts
const adminSchema = new Schema<AdminData>({
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name:{type: String, required: true},
    role: {type: String, default:"admin", enum: ["admin", "user"]}
});

export const adminModel = model("Admin", adminSchema);