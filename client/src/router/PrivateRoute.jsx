// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, role }) {
    const token = localStorage.getItem("token"); // JWT or session token
    const userRole = localStorage.getItem("role"); // "Admin", "Merchant", "Customer"

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;
