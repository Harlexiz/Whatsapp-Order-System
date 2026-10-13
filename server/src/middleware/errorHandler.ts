import type {Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";


export const errorHandler = (err: Error, req: Request,res: Response,next: NextFunction) => {
  
    // Handle errors we intentionally created
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unexpected errors: log the real error for debugging
  console.error("UNEXPECTED ERROR:", err);

  // Don't expose internal details to the client
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};