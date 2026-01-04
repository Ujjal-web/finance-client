import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
