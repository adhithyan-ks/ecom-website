import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";

const app = express();
const port = 3000;
dotenv.config();

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}.`);
});

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/user", userRoutes);