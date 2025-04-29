import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("working");
});

app.listen(PORT, () => console.log("app is working on 3000"));
