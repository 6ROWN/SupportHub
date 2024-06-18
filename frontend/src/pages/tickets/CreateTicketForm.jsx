import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTicket, reset } from "../../features/tickets/ticketSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const CreateTicketForm = () => {
	const { user } = useSelector((state) => state.auth);
	const { isLoading, isError, message } = useSelector(
		(state) => state.ticket
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: user.firstName + " " + user.lastName || "",
		email: user.email || "",
		ticketType: "",
		priorityLevel: "",
		status: "New",
		department: "",
		issueCategory: "",
		resolutionMethod: "",
		impact: "",
		description: "",
	});

	const ticketTypes = [
		"Inquiry",
		"Request",
		"Incident",
		"Problem",
		"Change Request",
	];
	const priorityLevels = ["Low", "Medium", "High", "Critical"];
	const departments = [
		"IT",
		"HR",
		"Finance",
		"Facilities",
		"Customer Service",
		"Marketing",
		"Sales",
	];
	const issueCategories = [
		"Hardware",
		"Software",
		"Network",
		"Security",
		"Account Access",
		"Other",
	];
	const resolutionMethods = ["Phone", "Email", "In Person", "Remote"];
	const impacts = ["Individual", "Department", "Organization"];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Create a copy of formData without name and email
		const { name, email, ...ticketData } = formData;
		// Dispatch createTicket action with the filtered data
		dispatch(createTicket(ticketData));
		//Navigate to success page
		navigate("/success", {
			state: {
				message: "Ticket created successfully!",
				subMessage:
					"A specialist will reach out to you by email or phone to help resolve your issue.",
			},
		});
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
		<div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
				<h1 className="text-3xl font-extrabold text-center text-gray-900">
					Help Desk Ticket Support
				</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="name"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
								required
							/>
						</div>
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="email"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
								required
							/>
						</div>
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="ticketType"
							>
								Ticket Type
							</label>
							<select
								id="ticketType"
								name="ticketType"
								value={formData.ticketType}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
								required
							>
								<option value="" disabled>
									Select a ticket type
								</option>
								{ticketTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="priorityLevel"
							>
								Priority Level
							</label>
							<select
								id="priorityLevel"
								name="priorityLevel"
								value={formData.priorityLevel}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
								required
							>
								<option value="" disabled>
									Select a priority level
								</option>
								{priorityLevels.map((level) => (
									<option key={level} value={level}>
										{level}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="department"
							>
								Department
							</label>
							<select
								id="department"
								name="department"
								value={formData.department}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
								required
							>
								<option value="" disabled>
									Select a department
								</option>
								{departments.map((dept) => (
									<option key={dept} value={dept}>
										{dept}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="issueCategory"
							>
								Issue Category
							</label>
							<select
								id="issueCategory"
								name="issueCategory"
								value={formData.issueCategory}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
								required
							>
								<option value="" disabled>
									Select an issue category
								</option>
								{issueCategories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="resolutionMethod"
							>
								Resolution Method
							</label>
							<select
								id="resolutionMethod"
								name="resolutionMethod"
								value={formData.resolutionMethod}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
							>
								<option value="" disabled>
									Select a resolution method
								</option>
								{resolutionMethods.map((method) => (
									<option key={method} value={method}>
										{method}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								className="block text-[#383185] font-medium mb-2"
								htmlFor="impact"
							>
								Impact
							</label>
							<select
								id="impact"
								name="impact"
								value={formData.impact}
								onChange={handleChange}
								className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
								required
							>
								<option value="" disabled>
									Select an impact
								</option>
								{impacts.map((impact) => (
									<option key={impact} value={impact}>
										{impact}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						<label
							className="block text-[#383185] font-medium mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<textarea
							placeholder="Write a short description of the issue"
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="text-gray-700 text-sm w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
							rows="4"
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="w-full bg-[#383185] text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateTicketForm;
