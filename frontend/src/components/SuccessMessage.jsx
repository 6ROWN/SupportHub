import React, { useEffect } from "react";
import {
	CheckCircleIcon,
	HomeIcon,
	TicketIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessMessage = ({ message, subMessage }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = location;

	useEffect(() => {
		// Redirect if state is not defined (user navigated back)
		if (!state) {
			navigate("/");
		}
	}, [state, navigate]);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full space-y-8 p-8 bg-white shadow-md rounded-lg">
				<div className="w-36 h-36 mx-auto">
					<CheckCircleIcon className="text-green-600" />
				</div>
				<h1 className="text-2xl font-bold text-center text-gray-900">
					{state.message}
				</h1>
				{state.subMessage && (
					<div className="p-4 bg-gray-100 rounded-md">
						<h3 className="font-bold uppercase text-sm text-gray-700 mb-3">
							What's Next?
						</h3>
						<p>{state.subMessage}</p>
					</div>
				)}

				<div className="flex justify-between items-center space-x-6">
					<Link
						to="/"
						replace
						className=" w-full bg-blue-500 text-white hover:bg-blue-600 font-medium border  p-2 px-6 flex items-center justify-center rounded"
					>
						<HomeIcon className="h-6 w-6 inline-block mr-4" />
						Home
					</Link>

					<Link
						to="/tickets"
						replace
						className=" w-full bg-blue-500 text-white hover:bg-blue-600 font-medium border  p-2 px-6 flex items-center justify-center rounded"
					>
						<TicketIcon className="h-6 w-6 inline-block mr-4" />
						View Tickets
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SuccessMessage;
