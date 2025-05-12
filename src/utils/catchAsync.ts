import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../exceptions/appError";

export const catchAsync =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new AppError("Validation Error", 400, err?.errors));
      }
      next(err);
    }
  };
