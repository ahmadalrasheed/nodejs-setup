import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { AppError } from "../exceptions/appError";
import { signinSchema, signupSchema } from "../schema/user";
import { AuthRequest } from "../types/auth";

export const signUp = async (req: Request, res: Response) => {
  const validatedData = signupSchema.parse(req.body);
  const { email, password, name } = validatedData;

  const existingUser = await prismaClient.user.findFirst({ where: { email } });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const signIn = async (req: Request, res: Response) => {
  const validatedData = signinSchema.parse(req.body);
  const { email, password } = validatedData;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new AppError("User Doesn't Exist!", 404);
  }
  if (!compareSync(password, user.password)) {
    throw new AppError("Wrong password!", 400);
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET as string);

  res.json({ user, token });
};

export const me = async (req: AuthRequest, res: Response) => {
  res.json(req.user);
};
