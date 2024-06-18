import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTicket, deleteTicket } from "../../features/tickets/ticketSlice";
import {
	ArchiveBoxIcon,
	ChevronDoubleLeftIcon,
	CommandLineIcon,
	ExclamationCircleIcon,
	HandRaisedIcon,
	ListBulletIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/solid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatDate } from "../../utils";

const SingleTicket = () => {
	const { id } = useParams();
	const { ticket, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.ticket
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getTicket(id));
	}, [id, dispatch]);

	const handleBack = () => {
		navigate("/tickets");
	};

	const handleEdit = () => {
		navigate(`/editTicket/${ticket._id}`, { state: { ticket } });
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this ticket?")) {
			dispatch(deleteTicket(ticket._id))
				.then(() => {
					navigate("/success", {
						state: {
							message: "Ticket deleted successfully!",
						},
					});
				})
				.catch((error) => {
					// Handle error appropriately, e.g., show error message
					console.error("Error deleting ticket:", error);
				});
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-blue-100 flex items-center justify-center flex-col space-y-8">
				<LoadingSpinner />
				<h1 className="animate-pulse text-lg font-medium text-blue-600">
					This will only take a few seconds
				</h1>
			</div>
		);
	}

	if (!ticket || isError) {
		return (
			<div className="min-h-screen bg-red-100 flex items-center justify-center flex-col space-y-8">
				<h1 className="text-lg font-medium text-red-600">
					{message || "An error occurred while fetching tickets"}
				</h1>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
			<div className="w-full max-w-7xl mx-auto flex justify-between items-center">
				<button
					onClick={handleBack}
					className=" px-4 py-2 border border-gray-300 rounded-md font-semibold shadow-sm"
				>
					<ChevronDoubleLeftIcon className="h-5 w-5 inline-block mr-2" />
					Back
				</button>
				<button
					onClick={handleEdit}
					className="bg-blue-300 text-gray-100  px-4 py-2 border-2 border-blue-600 rounded-md font-semibold shadow-sm hover:bg-gray-100 hover:text-blue-600 ease-in-out"
				>
					<PencilSquareIcon className="h-5 w-5 inline-block mr-2" />
					UPDATE TICKET
				</button>
			</div>

			{isSuccess && ticket && (
				<div className="w-full max-w-7xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
					<div className="flex justify-between items-center">
						<div className="space-y-2">
							<div className="flex items-center space-x-2 ">
								<h2 className="text-2xl font-bold">
									Ticket ID:{" "}
								</h2>
								<p className="font-normal text-gray-600 text-lg">
									{ticket._id}
								</p>
							</div>
							<div>
								<p>
									<strong>Latest Submission:</strong>{" "}
									{formatDate(ticket.updatedAt)}
								</p>
							</div>
						</div>
						<div className="text-white bg-green-500 py-0.5 px-4 rounded-full">
							<strong>{ticket.status}</strong>
						</div>
					</div>
					<hr className="my-4" />

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
						<div className="bg-gray-100 rounded-md p-4 flex items-center flex-col shadow-md">
							<div className="flex items-center justify-center space-x-8 w-full">
								<CommandLineIcon className="w-12 h-12 text-yellow-400" />
								<div>
									<h2 className="text-sm font-bold text-yellow-600 mb-2">
										TICKET TYPE
									</h2>
									<p className="text-gray-800 font-medium text-sm">
										{ticket.ticketType}
									</p>
								</div>
							</div>
						</div>
						<div className="bg-gray-100 rounded-md p-4 flex items-center flex-col shadow-md">
							<div className="flex items-center justify-center space-x-8 w-full">
								<ExclamationCircleIcon className="w-12 h-12 text-red-500" />
								<div>
									<h2 className="text-sm font-bold text-red-600 mb-2">
										PRIORITY
									</h2>
									<p className="text-gray-800 font-medium text-sm">
										{ticket.priorityLevel}
									</p>
								</div>
							</div>
						</div>
						<div className="bg-gray-100 rounded-md p-4 flex items-center flex-col shadow-md">
							<div className="flex items-center justify-center space-x-8 w-full">
								<HandRaisedIcon className="w-12 h-12 text-blue-400" />
								<div>
									<h2 className="text-xl font-bold text-blue-600 mb-2">
										IMPACT
									</h2>
									<p className="text-gray-800 font-medium text-sm">
										{ticket.impact}
									</p>
								</div>
							</div>
						</div>
						<div className="bg-gray-100 rounded-md p-4 flex items-center flex-col shadow-md">
							<div className="flex items-center justify-center space-x-8 w-full">
								<ListBulletIcon className="w-12 h-12 text-green-400" />
								<div>
									<h2 className="text-xl font-bold text-green-600 mb-2">
										CATEGORY
									</h2>
									<p className="text-gray-800 font-medium text-sm">
										{ticket.issueCategory}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="p-4 bg-gray-100 rounded shadow-sm">
						<h1 className="font-bold text-lg mb-2">
							Description of issue
						</h1>
						<p>{ticket.description}</p>
					</div>
					<div className="p-4 bg-gray-100 rounded shadow-sm mt-4">
						<div className="flex items-center space-x-2">
							<h1 className="font-semibold text-sm">
								Department:
							</h1>
							<p className="text-gray-600">{ticket.department}</p>
						</div>
						<div className="flex items-center space-x-2">
							<h1 className="font-semibold text-sm">
								Resolution Method:
							</h1>
							<p className="text-gray-600">
								{ticket.resolutionMethod}
							</p>
						</div>
					</div>
				</div>
			)}
			<div className="w-full max-w-7xl mx-auto flex justify-end items-center mt-8">
				<button
					onClick={handleDelete}
					className="bg-red-100 text-red-600  px-4 py-2 border-2 border-red-600 rounded-md font-semibold shadow-sm hover:bg-red-600 hover:text-white ease-in-out"
				>
					<ArchiveBoxIcon className="h-5 w-5 inline-block mr-2" />
					DELETE TICKET
				</button>
			</div>
		</div>
	);
};

export default SingleTicket;
