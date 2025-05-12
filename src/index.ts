import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRoutes from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { notFound } from "./controllers/notFound";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRoutes);

app.use(notFound);

app.use(errorMiddleware);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(PORT, () => console.log("app is working on 3000"));
