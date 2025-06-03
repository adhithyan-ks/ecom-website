import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/user.context";

const PrivateRoute = () => {
    const { user } = useUser();

    return (
        user ? <Outlet /> : <Navigate to={"/sign-in"} />
    )
}

export default PrivateRoute;