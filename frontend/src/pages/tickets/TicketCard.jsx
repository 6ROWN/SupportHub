import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils";

const TicketCard = ({ ticket, index }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/ticket/${ticket._id}`);
	};

	const getPriorityClass = (priority) => {
		switch (priority.toLowerCase()) {
			case "critical":
				return "bg-pink-200 text-gray-500";
			case "high":
				return "bg-green-200 text-gray-500";
			case "medium":
				return "bg-yellow-200 text-gray-500";
			case "low":
				return "bg-orange-100 text-gray-500";
			default:
				return "";
		}
	};

	const getStatusClass = (status) => {
		switch (status.toLowerCase()) {
			case "new":
				return "bg-violet-500 border border-white  text-white";
			case "open":
				return "bg-green-500 border border-white text-white";
			case "pending":
				return "bg-yellow-500 border border-white text-black";
			case "resolved":
				return "bg-purple-500 border border-white text-white";
			case "closed":
				return "bg-gray-500 border border-white text-white";
			case "on hold":
				return "bg-orange-500 border border-white text-white";
			case "cancelled":
				return "bg-red-500 border border-white text-white";
			default:
				return "";
		}
	};

	return (
		<tr
			onClick={handleClick}
			className={`hover:bg-gray-100 hover:text-gray-600 cursor-pointer ${getPriorityClass(
				ticket.priorityLevel
			)}`}
		>
			<td className="py-2 px-4 border-b text-xs space-x-4">
				<input type="checkbox" />
				<span className="">{index + 1}</span>
			</td>

			<td className="py-2 px-4 border-b">{ticket.ticketType}</td>
			<td className="py-2 px-4 border-b text-sm">
				<button
					className={`py-0.5 px-2.5 rounded-lg ${getStatusClass(
						ticket.status
					)}`}
				>
					{ticket.status}
				</button>
			</td>
			<td className="py-2 px-4 border-b">{ticket.priorityLevel}</td>
			<td className="py-2 px-4 border-b">{ticket.issueCategory}</td>
			<td className="py-2 px-4 border-b">
				{ticket.description && ticket.description.length > 30
					? ticket.description.substring(0, 70) + "..."
					: ticket.description}
			</td>
			<td className="py-2 px-4 border-b">
				{formatDate(ticket.createdAt)}
			</td>
		</tr>
	);
};

export default TicketCard;
