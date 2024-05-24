import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalstorage";

const ProtectedRoute = () => {
    const [authToken] = useLocalStorage('auth', null);
    if (!authToken) {
        return <Navigate to="/login" />;
    }
    return null;
}

export default ProtectedRoute;