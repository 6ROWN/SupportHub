import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileModal from "./ProfileModal";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const toggleModal = () => {
		setShowModal((prev) => !prev);
	};

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/login");
	};

	return (
		<div className="bg-[#383185] w-full">
			<div className="flex justify-between items-center py-4 px-4 md:px-20">
				<div>
					<h1 className="text-[#ffffff] text-xl md:text-2xl">
						<Link to="/">SUPPORT-HUB</Link>
					</h1>
				</div>

				{isAuthenticated || user ? (
					<div
						onClick={toggleModal}
						className="relative cursor-pointer"
					>
						<div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center hover:ring-4 hover:ring-gray-400 font-semibold hover:font-bold ease-in-out duration-300">
							{user.firstName && user.firstName.length > 0
								? user.firstName[0]
								: ""}
						</div>
						{showModal && (
							<ProfileModal user={user} logout={onLogout} />
						)}
					</div>
				) : (
					<div className="flex justify-between items-center space-x-4 md:space-x-8 text-[#ffffff] text-sm md:text-base">
						<div className="hover:text-[#e70033]">
							<Link to="/login">Sign In</Link>
						</div>
						<div className="border-l border-white h-6"></div>
						<div className="hover:text-[#e70033]">
							<Link to="/register">Create An Account</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
