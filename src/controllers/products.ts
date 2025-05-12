import { Request, Response } from "express";
import { prismaClient } from "..";
import { AppError } from "../exceptions/appError";
import { productSchema } from "../schema/product";

export const createProduct = async (req: Request, res: Response) => {
  const parsedRequest = { ...req.body, tags: req.body?.tags?.join(",") };
  productSchema.parse(parsedRequest);

  const product = await prismaClient.product.create({
    data: parsedRequest,
  });
  res.json(product);
};
export const updateProduct = async (req: Request, res: Response) => {
  const body = req.body;
  if (body.tags) {
    body.tags = req.body.tags.join(",");
  }
  productSchema.parse(body);
  try {
    const product = await prismaClient.product.update({
      where: { id: +req.params.id },
      data: body,
    } as any);
    res.json(product);
  } catch {
    throw new AppError("Product not found!", 400);
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.delete({
      where: { id: +req.params.id },
    } as any);
    res.json(product);
  } catch {
    throw new AppError("Product not found!", 400);
  }
};
export const listProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const skip = (page - 1) * pageSize;

  const total = await prismaClient.product.count();

  const products = await prismaClient.product.findMany({
    skip,
    take: pageSize,
  });

  res.json({
    page,
    pageSize,
    total,
    products,
  });
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });
    res.json(product);
  } catch {
    throw new AppError("Product not found!", 400);
  }
};
