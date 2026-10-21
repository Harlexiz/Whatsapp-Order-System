import type { NextFunction, Response, Request } from "express";

// express-session uses callbacks. These wrappers let us use async/await.
export const regenerate = (req:Request):Promise<void> => new Promise((resolve, reject) => req.session.regenerate((e) => (e ? reject(e) : resolve())));

export const save = (req:Request):Promise<void> => new Promise((resolve, reject) => req.session.save((e) => (e ? reject(e) : resolve())));

export const destroy = (req:Request):Promise<void> =>
  new Promise((resolve, reject) => req.session.destroy((e) => (e ? reject(e) : resolve())));