import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookie.access_token;
    if (!token) {
        return next(errorHandler(401, "Unauthorized. Sign-in to continue."));
    }
}