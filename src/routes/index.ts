import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";

const rootRoutes: Router = Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/product", productRoutes);

export default rootRoutes
