//Actions => Login, Logout, Ftech Current Admin

import type { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/appError.js";
import { verifyCredentials } from "../services/adminService.js";
import { regenerate, save } from "../utils/sessionUtils.js";





//==> Admin Authentication <==//

// Login
export async function adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;


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
         res.json({ admin});
    } catch (err) {
        next(err);
    }
}
