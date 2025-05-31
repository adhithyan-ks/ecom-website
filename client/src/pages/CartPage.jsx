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
                if (response.ok) {
                    setCart(data.cart);
                } else {
                    setError(data.message || "Failed to load cart.");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
                // console.error("Error:", err);
            } finally {
                
            }
        };
    });
    return (
    <>
        <Header />
            
        <Footer />
    </>
    )
}

export default CartPage;