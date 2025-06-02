import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
    const [ products, setProducts ] = useState([]);
    const [ cartMessage, setCartMessage ] = useState("");

    useEffect( () => {
        const getProduct = async () =>{
            try {
                const response = await fetch("/api/user/all-products");
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products);   
                }
            } catch (error) {
                console.log("Error:", error)
            }
        };
        getProduct();
    }, []);

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await fetch("/api/user/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId, quantity }),
            });

            const data = await response.json();

            if (response.ok) {
                setCartMessage(`Added to cart: ${data.message || "Success"}`);
                setTimeout( () => setCartMessage(""), 3000);
            } else {
                setCartMessage(`Error: ${data.message || "Failed to add to cart"}`);
            }

        } catch (error) {
            console.error("Error adding to cart:", error);
            setCartMessage("An unexpected error occured. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-6xl mx-auto py-8">
                    <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
                    { cartMessage && (
                        <div className="text-center text-green-600 font-semibold mb-4">
                            { cartMessage }
                        </div>
                    )
                    }
                    { products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            { products.map( (product) => (
                                <div key={ product._id } className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <Link to={`/product/${product._id}`}>
                                    <img 
                                        src={ product.image }
                                        alt={ product.title } 
                                        className="w-full h-48 object-cover rounded-t-lg"   
                                    />
                                    </Link>
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold mb-2">{ product.title }</h2>
                                        <p className="text-gray-600 text-sm mb-2">{ product.description }</p>
                                        <p className="text-gray-800 font-bold mb-4">Price: ${ product.price }</p>
                                        <button onClick={ () => addToCart(product._id)}
                                        className="w-full bg-orange-400 text-white py-2 rounded-md font-semibold hover:bg-orange-500 transition-colors">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            )) }
                        </div>
                    ) : 
                    (
                        <div className="text-center text-gray-500">No Products Available</div>
                    )
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
export default HomePage;