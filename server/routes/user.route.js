import express from "express";
import { getAllProducts, getProduct, addToCart, getCart } from "../controllers/user.controller.js";

const router = express();

router.get("/all-products", getAllProducts);
router.get("/product/:id", getProduct);

router.post("/add-to-cart", addToCart);
router.get("/cart", getCart);

export default router;