import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = () => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	return isAuthenticated || user ? <Outlet /> : <Navigate to={"/about"} />;
};

export default AuthRoute;
