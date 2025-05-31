import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
//     products: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Products",
//         quantity: {
//             type: Number,
//             default: 1
//         }
//     }],
// --- CORRECTED PRODUCTS ARRAY DEFINITION ---
        products: [{
            product: { // This defines an embedded object for each item
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true // It's good practice to make the product ID required
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
// ------------------------------------------
    totalAmount: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;