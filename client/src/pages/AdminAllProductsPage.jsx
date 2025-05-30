import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminAllProductsPage = () => {
    const [ products, setProducts ] = useState([]);
    const [ message, setMessage ] = useState("");
    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/user/all-products");
                const data = await response.json();
                if (response.ok) {
                    setProducts(data.products || []);
                } else {
                    setMessage(data.message || "Failed to fetch products.");
                }
            } catch(error) {
                console.error("Error fetching products:", error);
                setMessage("An unexpected error ocuured. Please try again.");
            }
        }
        fetchProducts();
    }, []);
    const deleteProduct = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if(!confirmDelete) 
            return;
        try {
            const response = await fetch(`/api/admin/delete-product/${productId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                setProducts( (prev) =>
                prev.filter( (product) => product._id !== productId));
                setMessage("Product deleted successfully.");
            } else {
                setMessage(data.message || "Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            setMessage("An unexpected error ocuured. Please try again.");
        }
    };
    return (
        <>
        <Header />
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Admin: All Products</h1>
                {
                    message && (
                        <p className="text-center text-sm font-semibold text-green-600 mb-4">
                            { message }
                        </p>
                    )
                }
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            products.length > 0 ? (
                                products.map( (product, index) => (
                                    <tr key={product._id} className="border-b">
                                        <td className="px-4 py-2 text-center">{index + 1}</td>
                                        <td className="px-4 py-2 text-center">
                                            <img 
                                                src={product.image} 
                                                alt={product.title} 
                                                className="w-16 h-16 object-cover rounded" 
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-center">{product.title}</td>
                                        <td className="px-4 py-2 text-center">${product.price}</td>
                                        <td className="px-4 py-2 text-center">{product.description}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button 
                                                onClick={() => deleteProduct(product._id)} 
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                            <Link 
                                                to={`/admin/edit/product/${product._id}`}
                                                className="ml-5 bg-yellow-300 text-white px-4 py-2 rounded-md hover:bg-yellow-400 transition">
                                                    Update
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500 font-semibold">
                                        No products found.
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        <Footer />
        </>
    )
}

export default AdminAllProductsPage;