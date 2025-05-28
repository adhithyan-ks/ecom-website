import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const All = () => {
    const [ products, setProducts ] = useState([]);

    useEffect( () => {
        const getProducts = async () => {
            try {
                const response = await fetch("/api/user/all-products");
                if(response.ok) {
                    const data = await response.json();
                    console.log("Data:", data); // Logs data
                    setProducts(data.allProducts);
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
            <h1>All Products</h1>
            { products.length > 0 ? (
                <div style = {{ width: "100vw", display: "flex", gap: "20px" }}>
                    { products.map( (p) => (
                        <div style={{ width: "300px", height: "400px", border: "2px solid black", borderRadius: "25px" }}>
                            <Link to={ `/product/${p._id}` }>
                                <img src={p.image} alt="image-photo" />
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
        </div>
    );
}

export default All;