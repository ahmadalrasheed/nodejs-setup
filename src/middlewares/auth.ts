import { NextFunction, Request, Response } from "express";
import { AppError } from "../exceptions/appError";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { AuthRequest } from "../types/auth";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError("Unauthorized!", 401);
  }
  try {
    const payload: any = jwt.verify(token, JWT_SECRET as any);
    const user = await prismaClient.user.findFirst({
      where: { id: payload?.userId },
    });
    if (!user) {
      throw new AppError("Unauthorized!", 401);
    }
    req.user = user;
    next();
  } catch (err) {
    throw new AppError("Unauthorized!", 401);
  }
};
