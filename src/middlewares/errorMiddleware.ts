import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("💥", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  const response: any = {
    statusCode,
    success: false,
    message,
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(statusCode).json(response);
};
