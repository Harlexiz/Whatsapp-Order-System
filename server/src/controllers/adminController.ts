//Actions => Login, Logout, Ftech Current Admin

import type { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/appError.js";
import { createProduct, deleteProduct, getAdminById, getDashboardStatsService, updateAdminPassword, updateAdminProfileService, updateProduct, verifyCredentials } from "../services/adminService.js";
import { destroy, regenerate, save } from "../utils/sessionUtils.js";
import { config } from "../config.js/index.js";
import mongoose from "mongoose";




const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//==> Admin Authentication <==//

// Login
export async function adminLogin(req: Request, res: Response, next: NextFunction) {

    try {
        const { email, password } = req.body;

        console.log(req.body)

        if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
            throw new AppError('Email and password are required', 400);
        }
        // CHeck if email cis valid (regex)

        if (!emailRegex.test(email)) {
            throw new AppError("Email not valid", 400)
        }


        const admin = await verifyCredentials(email, password);


        // SESSION ID CREATED HERE: regenerate() discards the old ID and makes a new one.
        // This prevents session fixation attacks.

        await regenerate(req);


        req.session.adminId = admin.id; // this is what makes the session "logged in"
        // const csrfToken = issueToken(req);


        await save(req);                // written to the "sessions" collection

        // res.json({ admin, csrfToken });
        res.status(200).json({ data: { id: admin.id, name: admin.name, email: admin.email, role: admin?.role } })
    } catch (err) {
        next(err);
    }
}

//Get Current Logged in User

export async function getCurrentAdmin(req: Request, res: Response) {
    const admin = await getAdminById(req.admin?.id ?? "")
   
    res.status(200).json({ data: { id: admin?.id, name: admin?.name, email: admin?.email, role: admin?.role } });
}

//Logout
export async function adminLogout(req: Request, res: Response, next: NextFunction) {
    try {
        await destroy(req); // deletes the session document from MongoDB
        res.clearCookie(config.cookieName);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}


// Update Profile

export async function adminUpdateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email } = req.body
        if ([name, email].some(field => !field)) {
            throw new AppError("All fields are requied", 400)
        }


        // confim if emal is valid
        if (!emailRegex.test(email)) {
            throw new AppError("Email not valid", 400)
        }

        if (!req.admin?.id) {
            throw new AppError("Unauthorized", 401);
        }

        await updateAdminProfileService(req.admin.id, name, email)

        return res.status(200).json({
            message: "Profile updated successfully"
        });


    } catch (error) {
        next(error)
    }
}


/// Update user password

export async function adminUpdatePassword(req: Request, res: Response, next: NextFunction) {
    console.log("Route hit")
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
         
        if (!req.admin?.id) {
            throw new AppError("Unauthorized", 401);
        }

        // 1. Validate input
        if (!currentPassword || !newPassword || !confirmPassword) {
            throw new AppError("All fields are required", 400)
        }

        if (newPassword.length < 8) {
            throw new AppError("New password must be at least 8 characters", 400)
        }

        if (newPassword !== confirmPassword) {
            throw new AppError("Passwords do not match", 400)
        }   
       

        // Pass to service 
        await updateAdminPassword(req.admin.id, currentPassword, newPassword)

        return res.status(200).json({message: "Password updated succesfully"})

    } catch (error) {
        next(error)
    }
}









//==> Products <==//


// New Product

export async function adminAddNewProduct(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("Rouets to lo jo ")
        const { name, category, unitPrice } = req.body

        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Validation error: "name" must be a non-empty string.' });
        }

        if (typeof category !== 'string' || category.trim() === '') {
            return res.status(400).json({ error: 'Validation error: "category" must be a non-empty string.' });
        }


        if (typeof unitPrice !== 'number' || isNaN(unitPrice)) {
            return res.status(400).json({ error: 'Validation error: "unitPrice" must be a valid number.' });
        }

        const newProduct = await createProduct({ category, name, unitPrice })

        return res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });


    } catch (error) {
        next(error)
    }

}


//Edit Product

export async function adminEditProduct(req: Request<{ id: string }>, res: Response, next: NextFunction) {

    try {
        const { name, category, isAvailable, unitPrice } = req.body;
        const { id } = req.params

        if (!id) {
            throw new AppError("Product ID is required", 400);
        }

        console.log(req.body)

        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Invalid Product Name" })
        }

        if (typeof unitPrice !== "number" || unitPrice < 0) {
            return res.status(400).json({ message: "Invalid Price" })
        }

        if (!category || typeof category !== "string") {
            return res.status(400).json({ message: "Invalid Category" })
        }

        if (typeof isAvailable !== "boolean") {
            return res.status(400).json({ message: "Invalid Product Name" })
        }




        await updateProduct(id, req.body)

        return res.status(200).json({
            message: "Product updated successfully"
        });


        // res.status(200).json({ data: { admin } })
    } catch (err) {
        next(err);
    }
}



//Delete Product


export async function adminDeleteProduct(req: Request<{ id: string }>, res: Response, next: NextFunction) {

    console.log("Deleted route accessed")

    try {
        const { productID } = req.body;


        if (!productID) {
            return res.status(400).json({
                message: "Product ID is required",
            });
        }

        if (typeof productID !== "string" && !mongoose.isValidObjectId(productID)) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        const deleted = await deleteProduct(productID);

        return res.status(200).json({
            message: "Product deleted successfully",
        });


    } catch (error) {
        next(error)

    }

}



//Get Stats


export async function adminGetDashboardStats(req: Request<{ id: string }>, res: Response, next: NextFunction) {

    try {
        const stats = await getDashboardStatsService();

        return res.status(200).json({
            message: "Dashboard statistics fetched successfully",
            data: { completedOrders: 35, ...stats },
        });
    } catch (error) {
        next(error);
    }



}


