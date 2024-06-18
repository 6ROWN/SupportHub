import React from "react";
import { Link } from "react-router-dom";
import { QuestionMarkCircleIcon, TicketIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const Home = () => {
	const { user, isAuthenticated } = useSelector((state) => state.auth);

	return (
		<main className="h-screen bg-gradient-to-b from-indigo-300 to-white flex flex-col items-center justify-center p-4">
			<div className="bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full text-center transform transition duration-500 hover:scale-105">
				{isAuthenticated || user ? (
					<>
						<h2 className="text-4xl font-bold text-gray-800 mb-4">
							Hello {user.firstName}, How can we help you?
						</h2>
						<p className="text-gray-600 mb-8 text-lg">
							Choose an option below to get started:
						</p>
					</>
				) : (
					<>
						<h2 className="text-4xl font-bold text-gray-800 mb-4">
							Welcome, How can we help you?
						</h2>
						<p className="text-gray-600 mb-8 text-lg">
							Choose an option below to get started:
						</p>
					</>
				)}
				<div className="flex flex-col space-y-6">
					<Link
						to="/create"
						className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 space-x-2"
					>
						<QuestionMarkCircleIcon className="h-6 w-6" />
						<span>Create a Ticket</span>
					</Link>
					<Link
						to="/tickets"
						className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 space-x-2"
					>
						<TicketIcon className="h-6 w-6" />
						<span>View Tickets</span>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Home;
