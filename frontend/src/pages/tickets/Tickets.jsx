import React, { useEffect, useState } from "react";
import { getTickets, reset } from "../../features/tickets/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import TicketCard from "./TicketCard";
import {
	BarsArrowDownIcon,
	BarsArrowUpIcon,
	MagnifyingGlassIcon,
	PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Tickets = () => {
	const { isLoading, isSuccess, tickets, isError, message } = useSelector(
		(state) => state.ticket
	);
	const [sortedTickets, setSortedTickets] = useState([]);
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchQuery, setSearchQuery] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTickets());
	}, [dispatch]);

	useEffect(() => {
		if (isSuccess && Array.isArray(tickets)) {
			setSortedTickets(tickets);
		}
	}, [isSuccess, tickets]);

	const handleSort = (field) => {
		const sortedArray = [...sortedTickets].sort((a, b) => {
			if (sortOrder === "asc") {
				if (a[field] < b[field]) return -1;
				if (a[field] > b[field]) return 1;
				return 0;
			} else {
				if (a[field] > b[field]) return -1;
				if (a[field] < b[field]) return 1;
				return 0;
			}
		});
		setSortedTickets(sortedArray);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredTickets = sortedTickets.filter((ticket) =>
		ticket
			? Object.values(ticket).some((value) =>
					value
						.toString()
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			  )
			: false
	);

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

	if (isError) {
		return (
			<div className="min-h-screen bg-red-100 flex items-center justify-center flex-col space-y-8">
				<h1 className="text-lg font-medium text-red-600">
					{message || "An error occurred while fetching tickets"}
				</h1>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-indigo-100 space-y-8 w-full p-12">
			<div className="w-full max-w-7xl mx-auto">
				<div className="w-full p-6 bg-white shadow-md rounded-lg">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						All Tickets
					</h1>
					<div className="flex justify-between items-center">
						<div className="relative w-full max-w-xs">
							<input
								type="text"
								placeholder="Search"
								value={searchQuery}
								onChange={handleSearch}
								className="w-full bg-gray-100 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<MagnifyingGlassIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
						</div>

						<div className="flex items-center space-x-4">
							<button
								onClick={() => handleSort("createdAt")}
								className="bg-indigo-500 text-gray-200 px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-red-200"
							>
								{sortOrder === "asc" ? (
									<BarsArrowUpIcon className="h-5 w-5 text-white" />
								) : (
									<BarsArrowDownIcon className="h-5 w-5 text-white" />
								)}
								<h1 className="ml-2">Sort</h1>
							</button>
							<Link
								to="/create"
								className="bg-indigo-500 text-gray-200 px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-red-200"
							>
								<PlusCircleIcon className="h-5 w-5 text-white" />
								<h1 className="ml-2">Create Ticket</h1>
							</Link>
						</div>
					</div>
				</div>

				{isSuccess && filteredTickets.length > 0 ? (
					<div className="overflow-x-auto my-4">
						<table className="min-w-full bg-white shadow-md rounded-lg">
							<thead>
								<tr>
									<th className="py-6 px-4 border-b">
										Customer SN
									</th>
									<th className="py-6 px-4 border-b">
										Ticket Type
									</th>
									<th className="py-6 px-4 border-b">
										Status
									</th>
									<th className="py-6 px-4 border-b">
										Priority
									</th>
									<th className="py-6 px-4 border-b">
										Issue
									</th>
									<th className="py-6 px-4 border-b">
										Description
									</th>
									<th className="py-6 px-4 border-b">Date</th>
								</tr>
							</thead>
							<tbody>
								{filteredTickets.map((ticket, index) =>
									ticket ? (
										<TicketCard
											key={ticket._id}
											ticket={ticket}
											index={index}
										/>
									) : null
								)}
							</tbody>
						</table>
					</div>
				) : (
					<p className="text-gray-500 text-center my-20">
						No tickets available.
					</p>
				)}
			</div>
		</div>
	);
};

export default Tickets;
