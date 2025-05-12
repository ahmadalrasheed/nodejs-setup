import { NextFunction, Response } from "express";
import { AppError } from "../exceptions/appError";
import { AuthRequest } from "../types/auth";

export const adminMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role == "ADMIN") {
    next();
  } else {
    throw new AppError("Unauthorized!", 401);
  }
};
