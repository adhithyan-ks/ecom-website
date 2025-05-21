import express from "express";
import { addProduct } from "../controllers/admin.controller.js";
import { deleteProduct } from "../controllers/admin.controller.js";
import { updateProduct } from "../controllers/admin.controller.js";

const router = express();

router.post("/add-product", addProduct);

router.delete("/delete-product/:id", deleteProduct);

router.patch("/update-product/:id", updateProduct);

export default router;