import express from "express";
import productRouter from "./routers/product";
import { connectDB } from "./config/db";
import authRouter from "./routers/auth";
import cors from "cors";
import cartsRouter from "./routers/carts";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", productRouter);
app.use("/", authRouter);
app.use("/carts", cartsRouter);

export const viteNodeApp = app;
