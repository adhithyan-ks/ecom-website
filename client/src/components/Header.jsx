import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/user.context";

const Header = () => {
    const { user, signOut } = useUser();
    console.log("User:", user);
    const handleSignOut = async () => {
        try {
            const res = await fetch("/api/auth/sign-out");
            if (res.ok) {
                signOut();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <header className="w-full bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Urban Woods</Link>
                <nav className="flex gap-6 text-sm font-medium">
                    <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
                    <Link to="/products" className="hover:text-gray-400 transition-colors">Products</Link>
                    <Link to="/about" className="hover:text-gray-400 transition-colors">About</Link>
                    {user?.isAdmin ?
                        (<div className="flex gap-6">
                            <Link to="/admin-all-products" className="hover: text-gray-400 transition-colors">All Products</Link>
                            <Link to="/add-products" className="hover:text-gray-400 transition-colors">Add Product</Link>

                        </div>
                        ) : (
                            <Link to="/cart" className="hover: text-gray-400 transition-colors">Cart</Link>
                        )}
                </nav>
                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <p className="flex gap-2 text-sm">
                                Welcome,
                                <span className="capitalize font-semibold">
                                    {user.firstName}
                                </span>
                                {user.isAdmin && <span className="font-bold">Admin</span>}
                            </p>
                            <Link
                                to="#"
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md font-semibold hover:bg-red-600 transition-colors"
                                onClick={() => handleSignOut()}>Sign Out</Link>
                        </div>
                    ) : (
                        <Link to="/sign-in" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md font-semibold hover:bg-blue-600 transition-colors">Sign In</Link>
                    )}
                </div>
            </div>
        </header>
    )
}
export default Header;