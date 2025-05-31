import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserDetails = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ orderSuccess, setOrderSuccess ] = useState(false);

    const isFormValid = name.trim() && email.trim() && address.trim();
    const handleByNow = () => {
        if (isFormValid) {
            setOrderSuccess(true);
            setName("");
            setEmail("");
            setAddress("");
        }
    };
    return (
        <>
        <Header />
            <div className="bg-gray-100 py-8 min-h-screen">

            </div>
        <Footer />
        </>
    )
}

export default UserDetails;