import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const All = () => {
    const [ products, setProducts ] = useState([]);

    useEffect( () => {
        const getProducts = async () => {
            try {
                const response = await fetch("/api/user/all-products");
                if(response.ok) {
                    const data = await response.json();
                    // console.log("Data:", data); // Logs data
                    setProducts(data.products);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);

    console.log("Products:", products);

    return (
        <div>
            <Header />
            <h1 className="text-2xl font-bold text-center text-gray-800">All Products</h1>
            { products.length > 0 ? (
                <div style = {{ width: "100vw", display: "flex", gap: "20px" }}>
                    { products.map( (p) => (
                        <div style={{ width: "300px", height: "400px", border: "2px solid black", borderRadius: "25px" }}>
                            <Link to={ `/product/${p._id}` }>
                                <img style={{ width: "100%", borderRadius: "25px" }} src={p.image} alt="image-photo" />
                            </Link>
                            <h2>{ p.title }</h2>
                            <p>{ p.description }</p>
                            <p>Price: { p.price }</p>
                            
                        </div>
                    )) }
                </div>
            ) : (
                <p>No Products Available</p>
            )}
            <Footer />
        </div>
    );
}

export default All;