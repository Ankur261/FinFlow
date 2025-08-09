// src/router/GuestRoute.jsx
import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return children;
    }

    // Redirect based on role
    const role = localStorage.getItem("role");
    if (role === "Admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "Merchant") return <Navigate to="/merchant/dashboard" replace />;
    if (role === "Customer") return <Navigate to="/customer/dashboard" replace />;

    return <Navigate to="/" replace />;
}

export default GuestRoute;
