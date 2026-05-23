import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    if (authUser.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
