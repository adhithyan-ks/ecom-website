import express from "express";
import { getAllProducts } from "../controllers/user.controller.js";

const router = express();

router.get("/all-products", getAllProducts);

export default router;