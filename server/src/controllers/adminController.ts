//Actions => Login, Logout, Ftech Current Admin

import type { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/appError.js";
import { updateProduct, verifyCredentials } from "../services/adminService.js";
import { destroy, regenerate, save } from "../utils/sessionUtils.js";
import { config } from "../config.js/index.js";





//==> Admin Authentication <==//

// Login
export async function adminLogin(req: Request, res: Response, next: NextFunction) {

    try {
        const { email, password } = req.body;

        console.log(req.body)

        if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
            throw new AppError('Email and password are required', 400);
        }



        const admin = await verifyCredentials(email, password);


        // SESSION ID CREATED HERE: regenerate() discards the old ID and makes a new one.
        // This prevents session fixation attacks.

        await regenerate(req);


        req.session.adminId = admin.id; // this is what makes the session "logged in"
        // const csrfToken = issueToken(req);


        await save(req);                // written to the "sessions" collection

        // res.json({ admin, csrfToken });
        res.status(200).json({ data: { admin } })
    } catch (err) {
        next(err);
    }
}

//Get Current Logged in User

export function getCurrentAdmin(req: Request, res: Response) {
    console.log("Trig to get the user")
    res.status(200).json({ admin: req.admin });
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










//==> Products <==//

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
