import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const roleCode = localStorage.getItem("roleCode");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (roleCode !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
