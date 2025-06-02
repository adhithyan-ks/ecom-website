import express from "express";
import { getAllProducts, getProduct, addToCart, getCart, clearCart } from "../controllers/user.controller.js";
import { verifyToken } from "../lib/verifyUser.js";

const router = express();

router.get("/all-products", getAllProducts);
router.get("/product/:id", getProduct);

router.post("/add-to-cart", verifyToken, addToCart);
router.get("/cart", verifyToken, getCart);
router.delete("/clear-cart", verifyToken, clearCart);

export default router;