import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserDetails = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ orderSuccess, setOrderSuccess ] = useState(false);

    const clearCart = async () => {  
      try {
          const response = await fetch("/api/user/clear-cart", {
              method: "DELETE",
          });
          const data = await response.json();
  
          if (response.ok) {
              // Clear the cart state
              console.log("Cart cleared successfully");
          } else {
              console.error(data.message || "Failed to clear cart");
          }
      } catch (error) {
          console.error("Error clearing cart:", error);
          alert("Error clearing cart. Please try again.");
      }
  };

    const isFormValid = name.trim() && email.trim() && address.trim();
    const handleByNow = () => {
        if (isFormValid) {
            setOrderSuccess(true);
            setName("");
            setEmail("");
            setAddress("");
            clearCart();
        }
    };
      return (
  <>
    {/* <Header /> */}
    <Header />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">User Details</h2>
      
      {orderSuccess && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
          Order placed successfully!
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-semibold" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold" htmlFor="address">Address</label>
        <textarea
          id="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter your address"
          rows={3}
        />
      </div>

      <button
        onClick={handleByNow}
        disabled={!isFormValid}
        className={`w-full py-2 rounded text-white font-semibold ${
          isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Buy Now
      </button>
    </div>
    <Footer />
  </>
);

}

export default UserDetails;