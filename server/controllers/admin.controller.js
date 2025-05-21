import Product from "../models/product.model.js";

//Create product
export const addProduct = async(req, res) => {
    // console.log(req.user);
    // if (!req.user.isAdmin) {
    //     return res.status(403).json({
    //         message: "You are not allowed to access this API!"
    //     });
    // }
    const {
        title, price, description, image
    } = req.body;
    if (!title || !price || !description || !image) {
        return res.json({success: false, message: "All fields are required!"});
    }
    try {
        const newProduct = new Product({
            title,
            price,
            description,
            image
        });
        await newProduct.save();
        res.json({success: true, message: "Product added successfully!", product: newProduct});
    }
    catch (error) {
        console.log(error);
    }
}
// Delete product
export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.json({success: false, message: "Id is required!"});
    }
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({success: false, message: "Product does not exist!"});
        }
        res.status(200).json({success: true, message: "Product deleted successfully"});
    }
    catch (error) {
        console.log(error);
    }
}
//Update product
export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const { title, price, description, image } = req.body;
    if(!id || !title || !price || !description || !image) {
        return res.json({success: false, message: "All fields required"});
    }
    try {
        const product = await Product.findByIdAndUpdate(id, { title, price, description, image});
        if(!product) {
            return res.status(404).json({success: false, message: "Product does not exist!"});
        }
        res.status(200).json({success: true, message: "Product updated successfully"});
    }
    catch(error) {
        console.log(error);
    }
}