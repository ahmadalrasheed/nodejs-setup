import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    status:404,
    success: false,
    message: "Not Found",
  });
};
