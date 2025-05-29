import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductPage = () => {
    const [ product, setProduct ] = useState(null);
    const [ error, setError ] = useState("");
    const [ cartMessage, setCartMessage] = useState("");

    const { id: productId } = useParams();
    useEffect( () => {
        const getProduct = async () => {
            try {
                const response = await fetch(`/api/user/product/${productId}`);
                const data = await response.json();
                if (response.ok) {
                    setProduct(data.product);
                } else {
                    setError(data.message || "Failed to fetch product details");
                }
            } catch (error) {
                setError("Something went wrong. Please try again.");
                console.error("",);
            }
        };
        if (productId) 
            getProduct();
    }, [ productId ]);
    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await fetch("/api/user/add-to-cart", {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                },
                body: json.stringify({ productId, quantity})
            });
            const data = await response.json();
            if(response.ok) {
                setCartMessage = `Added to cart : ${data.message || "Success"}`;
                setTimeout( () => {
                    setCartMessage("");
                }, 3000);
            } else {
                setCartMessage(`Error: ${data.message || "Failed to add to cart"}`);
            }
        } catch(error) {
            console.error("Error adding to cart:", error);
            setCartMessage("An unexpected error ocuured. Please try again.");
        }
    }
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-red-500 text-lg">
                    { error }
                </p>
            </div>
        )
    }
    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p>Loading..</p>
            </div>
        )
    }
    return (
        <>
            <Header />
                <div className="bg-gray-100 py-8">
                    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                        { cartMessage && (
                            <div className="text-center text-green-600 font-semibold mb-4">
                                { cartMessage }
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex justify-center items-center">
                                <img src={ product.image }
                                 alt={ product.title }
                                 className="rounded-lg max-h-96 object-contain"
                                 />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl md:text-3xl font-bold mb-4">{ product.title }</h1>
                                <p className="text-gray-700 mb-4">{ product.description }</p>
                                <p className="text-xl font-semibold text-gray-900 mb-6">${ product.price }</p>
                                <div className="border-t border-gray-300 pt-6">
                                    <p className="mb-4 text-gray-600">
                                        <span className="font-medium text-green-600">In stock</span>
                                    </p>
                                    <button onClick={ ()=> addToCart( product._id ) }
                                        className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors mb-4">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default ProductPage;
