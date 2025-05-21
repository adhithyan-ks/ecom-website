import Product from "../models/product.model.js";

export const getAllProducts = async(req, res) => {
    try {
        const allProducts = await Product.find();
        if(!allProducts) {
            return res.status(404).json({success: false, message: "No products found!"});
        }
        res.status(200).json({success: true, message: "Products found", total: allProducts.length, products: allProducts});
    }
    catch (error) {
        console.log(error);
    }
}
export const getProduct = async(req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.json({success: false, message: "Product Id is required!"});
    }
    try {
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({success: false, message: "Product was not foound!"});
        }
        return res.status(200).json({success: true, message: "Product found", product: product});
    }
    catch (error) {
        console.log(error);
    }
}