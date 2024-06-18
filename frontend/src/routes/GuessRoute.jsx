import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const GuessRoute = () => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	return !isAuthenticated || !user ? <Outlet /> : <Navigate to={"/"} />;
};

export default GuessRoute;
