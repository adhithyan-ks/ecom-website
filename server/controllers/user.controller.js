import Product from "../models/product.model.js";

export const getAllProducts = async(req, res) => {
    
    try {
        const allProducts = await Product.find();
        if(!allProducts) {
            return res.json({success: false, message: "No products found!"});
        }
        res.json({success: true, message: "Products found", total: allProducts.length, products: allProducts});
    }
    catch (error) {
        console.log(error);
    }
}