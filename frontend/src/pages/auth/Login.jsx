import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	const { user, isAuthenticated, isLoading, isError, message } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message, {
				position: "top-right",
				autoClose: false,
				closeOnClick: false,
				closeButton: false,
				draggable: false,
			});
		}

		if (isAuthenticated || user) {
			navigate("/");
		}
	}, [isError, message, isAuthenticated, user, navigate, dispatch]);

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});

		// Clear specific field error if it is valid
		const newErrors = { ...errors };

		if (name === "email" && value) {
			delete newErrors.email;
		}
		if (name === "password" && value) {
			delete newErrors.password;
		}

		setErrors(newErrors);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm(form);
		if (Object.keys(newErrors).length === 0) {
			// Submit form data
			dispatch(login(form));
		} else {
			setErrors(newErrors);
		}
	};

	const validateForm = (form) => {
		const errors = {};

		if (!form.email) errors.email = "Email is required";
		if (!form.password) errors.password = "Password is required";

		return errors;
	};

	return (
		<div
			className={` relative min-h-screen flex items-center justify-center bg-gray-100 bg-[url("https://images.pexels.com/photos/5453837/pexels-photo-5453837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] bg-cover bg-no-repeat `}
		>
			<div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-indigo-300 to-white opacity-50"></div>
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg z-10 mx-4">
				<ToastContainer />
				<h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							className={`mt-1 block w-full p-2 border ${
								errors.email
									? "border-red-500"
									: "border-gray-300"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email}
							</p>
						)}
					</div>
					<div className="relative">
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={form.password}
							onChange={handleChange}
							className={`mt-1 block w-full p-2 border ${
								errors.password
									? "border-red-500"
									: "border-gray-300"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
						/>
						<div
							onClick={togglePasswordVisibility}
							className="absolute top-[34px] right-3 cursor-pointer"
						>
							{showPassword ? (
								<EyeSlashIcon className="h-6 w-6 text-gray-500" />
							) : (
								<EyeIcon className="h-6 w-6 text-gray-500" />
							)}
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password}
							</p>
						)}
					</div>

					<button
						type="submit"
						className={`w-full py-2 px-4 font-semibold rounded-md shadow flex justify-center items-center ${
							isLoading
								? "bg-indigo-400 cursor-not-allowed"
								: "bg-indigo-600 hover:bg-indigo-700"
						} text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="animate-bounce">Loading...</div>
						) : (
							"Login"
						)}
					</button>
					<div className="text-center mt-4">
						<p className="text-sm text-gray-600">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-indigo-600 hover:underline"
							>
								Register
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
