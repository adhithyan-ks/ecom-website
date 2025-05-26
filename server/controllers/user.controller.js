import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

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
        return res.status(400).json({success: false, message: "Product Id is required!"});
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

//Cart
export const addToCart = async(req, res) => {
    try {
        // const userId = req.user.id;
        const userId = "682ad879c70e706186bbf568";

        const { productId, quantity } = req.body;
        const product =  await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product was not found! "});
        }

        //Find or create cart for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            //Creates new cart if none exists
            cart = new Cart({
                userId,
                products: [{ product: productId, quantity }],
                totalAmount: product.price * quantity
            });
        } else {
            const existingProduct = cart.products.find(item => item.product.toString() === productId);
        
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.unshift({ product: productId, quantity});
            }
            cart.totalAmount = cart.products.reduce((total, item) => {
                return total + (item.product.toString() === productId ? product.price : 0) * item.quantity;
            }, 0);
        }
        await cart.save();

        res.status(200).json({ success: true, message: "Product added to cart succcessfully", cart});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//Get cart
export const getCart = async(req, res) => {
    try {
        // const userId = req.user.id;
        const userId = "682ad879c70e706186bbf568";
        let cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.json({ success:true, message: "Cart is empty" });
        }
        return res.status(200).json({ success: true, cart});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}