import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const productRoutes: Router = Router();

productRoutes.post(
  "/createProduct",
  [authMiddleware, adminMiddleware],
  catchAsync(createProduct)
);
productRoutes.put(
  "/updateProduct/:id",
  [authMiddleware, adminMiddleware],
  catchAsync(updateProduct)
);
productRoutes.delete(
  "/deleteProduct/:id",
  [authMiddleware, adminMiddleware],
  catchAsync(deleteProduct)
);
productRoutes.get(
  "/listProducts",
  [authMiddleware, adminMiddleware],
  catchAsync(listProducts)
);
productRoutes.get(
  "/getProductById/:id",
  [authMiddleware, adminMiddleware],
  catchAsync(getProductById)
);

export default productRoutes;
