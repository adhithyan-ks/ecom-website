import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String
}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);
export default Product;