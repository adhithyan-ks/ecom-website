import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
    const [ cart, setCart ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    useEffect( () => {
        const fetchCart = async () => {
            try {
                const response = await fetch("/api/user/cart");
                const data = await response.json();
                console.log("cart data fetched :",data);
                if (response.ok) {
                    setCart(data.cart);
                } else {
                    setError(data.message || "Failed to load cart.");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
                // console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p>Loading..</p>
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-white">
                <p>{ error }</p>
            </div>
        )
    }
    if (!cart || cart.products.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-white">
                <p>Your cart is empty</p>
            </div>
        )
    }
    return (
    <>
        <Header />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto py-8">
                    <h1 className="text-3xl font-bold pb-4 mb-6">Your Cart</h1>
                    <div className="space-y-6">
                        { cart.products.map( (item) => {
                            if (!item.product) {
                                return (
                                    <div key={ item._id } className="flex items-center gap-3 p-4 rounded-md">
                                        <p className="text-red-500">Product details are missing</p>
                                    </div>
                                )
                            }
                            return (
                                <div key={ item._id } className="flex items-center gap-3 space-x p-4 rounded-md">
                                    { item.product.image? (
                                        <img src={ item.product.image } alt={ item.product.title } className="w-52 object-cover rounded"/>
                                    ) : (
                                        <div className="width-52 height-52 bg-gray-300 flex justify-center items-center rounded-md">
                                            <p className="text-center text-gray-500">No image available</p>
                                        </div>
                                    ) }
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold">{ item.product.title }</h2>
                                        <p className="text-gray-400">{ item.product.description }</p>
                                        <p className="mt-2">Price: ${ item.product.price }</p>
                                        <p>Quantity: { item.quantity }</p>

                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Total: ${ item.product.price * item.quantity }</p>
                                        <button className="h-8 text-white font-semibold bg-black rounded-md">Buy Now</button>
                                    </div>
                                </div>
                            );
                        }) }
                    </div>
                    <div className="mt-8 border-t border-white pt-4">
                        <h2 className="text-xl font-bold">Cart Total: ${ cart.totalAmount }</h2>
                    </div>
                    <Link to="/userdetails">
                        <button className="mx-auto px-5 py-1 font-semibold bg-black text-white rounded-md shadow-md">Checkout</button>
                    </Link>
                </div>
            </div>
        <Footer />
    </>
    )
}

export default CartPage;