import express from "express";
import { signUp } from "../controllers/auth.controller.js";
import { signIn } from "../controllers/auth.controller.js";
import { signOut } from "../controllers/auth.controller.js";

const router = express();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);

export default router;