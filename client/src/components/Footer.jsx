import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white py-6">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg font-semibold">E-Commerce</p>
                <p className="text-sm mt-2 text-gray-400">{ new Date().getFullYear() } E-Commerce. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;