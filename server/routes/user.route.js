import express from "express";
import { getAllProducts } from "../controllers/user.controller.js";
import { getProduct } from "../controllers/user.controller.js";

const router = express();

router.get("/all-products", getAllProducts);

router.get("/product/:id", getProduct);

export default router;