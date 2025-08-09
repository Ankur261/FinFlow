// src/router/AuthRoute.jsx
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}

export default AuthRoute;
