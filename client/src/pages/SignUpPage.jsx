import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Input change handler
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/auth/sign-up", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            // Handle server-side errors or success messages
            if (res.ok) { // Check if the response status is in the 200s
                setMessage(data.message || "Sign-up successful!");
                navigate("/sign-in");
            } else {
                setMessage(data.message || "Sign-up failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 -y-4" // Corrected -y-4 to space-y-4
            >
                <h1 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h1>
                {/* Firstname */}
                <div>
                    <label htmlFor="firstName" className="text-gray-700 text-sm font-medium">First Name</label>
                    <input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="Enter your first name"
                        className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Added px-3 and focus styles for better UX
                    />
                </div>
                {/* Lastname */}
                <div>
                    <label htmlFor="lastName" className="text-gray-700 text-sm font-medium">Last Name</label>
                    <input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="Enter your last name"
                        className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="text-gray-700 text-sm font-medium">Email</label>
                    <input
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {/* Password */}
                <div>
                    <label htmlFor="password" className="text-gray-700 text-sm font-medium">Password</label>
                    <input
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-2 w-full py-2 text-white rounded-md shadow-md font-semibold ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed" // Added cursor-not-allowed
                                : "bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" // Corrected focus-ring to focus:ring
                        }`}
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </button>
                </div>

                {/* Message */}
                {message && (
                    <p className={`text-center mt-4 font-medium ${
                        message.toLowerCase().includes("success")
                            ? "text-green-600"
                            : "text-red-600"
                    }`}>
                        {message}
                    </p>
                )}
                {/* Footer */}
                <div className="text-center text-sm text-gray-600">
                    Already Have an Account? {""}
                    <a href='/sign-in' className="text-orange-600 hover:text-orange-500 font-medium">Sign in</a>
                </div>
            </form>
        </div>
    )
}
export default SignUpPage;