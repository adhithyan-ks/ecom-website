import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [ productData, setProductData ] = useState({
        title: "",
        price: "",
        description: "",
        image: ""
    });
    const [ message, setMessage ] = useState("");

    useEffect( () => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/user/product/${productId}`);
                const data = await response.json();
                if(response.ok) {
                    setProductData({
                        title: data.product.title,
                        price: data.product.price,
                        description: data.product.description,
                        image: data.product.image
                    });
                } else {
                    setMessage(data.message || "Failed to fetch product details.");
                }

            } catch (error) {
                console.error("Error fetching products:", error);
                setMessage("An unexpected error occured. Please try again.");
            }
        };
        fetchProduct();
    }, [ productId ]);
    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData( (prevData) => ({
            prevData , [name] : value
        }));
        //Handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch(`/api/admin/update-product/${productId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productData)
                });
                const data = await response.json();
                if (response.ok) {
                    setMessage("Product updated successfully.");
                    setTimeout( () => {
                        navigate("/admin(products)");
                    }, 2000);
                } else {
                    setMessage(data.message || "Failed to update the product.");
                }
            } catch (error) {
                console.error("Error updating product:", error);
                setMessage("An unexpected error ocuured. Please try again.");
            }
        };
    };

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-2x font-bold text-center mb-6">Update Product</h1>
                { message && (
                    <p className={` text-center text-sm font-semibold  ${message.include("Successfully")
                    ? "text-green-600"
                    : "text-red-600"
                    }`}>
                        { message }
                    </p>
                ) }
                <form onSubmit={handleSubmit}>
                    {/* Title  */}
                    <div className="md-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                            requires
                            className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    Price ?
                    <div className="md-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            requires
                            className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="md-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                            requires
                            className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="md-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                            requires
                            className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;