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

    //Input change handler
    const handleChange = (e) => {
        const { id, value } = key.target;
        setFormData((prev) => ({ ...prev, [ id ]: value}));
    }

    //Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
    }
    try {
        const res = await fetch("/api/auth/sign-up", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        setMessaage(data.message);
        navigate("/sign-in");
    } catch (error) {
        setMessage("An error occured. Pease try again.");
    } finally {
        setLoading(false);
    }
};

return(


)

export default SignUpPage;