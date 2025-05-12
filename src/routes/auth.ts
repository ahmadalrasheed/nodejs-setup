import { Router } from "express";
import { me, signIn, signUp } from "../controllers/auth";
import { catchAsync } from "../utils/catchAsync";
import { authMiddleware } from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", catchAsync(signUp));
authRoutes.post("/signin", catchAsync(signIn));
authRoutes.get("/me", [authMiddleware], catchAsync(me));

export default authRoutes;
