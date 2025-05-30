import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: "", price: "", description: "", image: ""
    })
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/admin/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, price: parseFloat(formData.price) })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Product added successfully");
                setFormData({
                    title: "", price: "", description: "", image: ""
                });
            } else {
                setMessage(`Error: ${data.message} || "Failed to add product"`);
            }
        } catch (error) {
            console.log("Error:", error);
            setMessage("An unexpected error occured. Please try again.");
        }
    }
    return (
        <>
            <Header />
            <div className="min-h-screen  bg-gray-100">
            <div className="min-h-4 bg-gray-100 flex justify-center">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">Add New Product</h1>
                    {message && (
                        <p className="text-center text-sm font-semibold text-green-600 mb-4">{message}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4" action="">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Title</label>
                            <input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter product title"
                                required
                                className="mb-1 block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Price  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="text"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter product price"
                                required
                                className="mb-1 block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Decription  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                required
                                className="mb-1 block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Image url  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Enter product image URL"
                                required
                                className="mb-1 block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Button  */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                                    Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            <Footer />
        </>
    )
};

export default AddProduct;