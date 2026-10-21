// GUARD: validates the logged-in state on every protected request.
// By the time this runs, express-session has already found the session
// from the cookie and filled req.session.
import type {Request, Response, NextFunction} from 'express'
import { getAdminById } from '../services/adminService.js';
import {  destroy} from '../utils/sessionUtils.js';

export async function requireAdmin(req:Request, res:Response, next:NextFunction) {
  try {
    if (!req.session.adminId) return res.status(401).json({ error: 'Not authenticated' });

    const admin = await getAdminById(req.session.adminId);
    if (!admin) {
      // Admin was deleted while the session was still alive.
      await destroy(req);
      return res.status(401).json({ error: 'Not authenticated' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
}