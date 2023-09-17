import React, { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div class="spinner-border text-warning" style={{ height: "3rem", width: "3rem" }} role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (user && user?.uid) {
        return children;
    }
    return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    )
};

export default PrivateRoute;