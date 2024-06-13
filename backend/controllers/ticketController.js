import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModels.js";
import User from "../models/userModel.js";

// @desc     Get user tickets
// @route    GET api/tickets
// @access   Private
const getUserTickets = asyncHandler(async (req, res) => {
	// Find the user by ID
	const user = await User.findById(req.user._id);
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Find tickets associated with the user
	const tickets = await Ticket.find({ user: req.user._id });

	// Send the tickets in the response
	res.status(200).json({
		tickets,
	});
});

// @desc     Get single ticket
// @route    GET api/tickets/:id
// @access   Private
const getSingleTicket = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(400);
		throw new Error("Ticket ID not provided");
	}

	// Find ticket associated with the ID
	const ticket = await Ticket.findById(id);
	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	// Send the ticket in the response
	res.status(200).json({
		ticket,
	});
});

// @desc     Create new ticket
// @route    POST api/tickets
// @access   Private
const createNewTicket = asyncHandler(async (req, res) => {
	// Destructure request body
	const {
		ticketType,
		priorityLevel,
		department,
		issueCategory,
		resolutionMethod,
		impact,
		urgency,
		source,
		description,
	} = req.body;

	// Check if required fields are provided
	if (
		!ticketType ||
		!priorityLevel ||
		!department ||
		!issueCategory ||
		!impact ||
		!description
	) {
		res.status(400);
		throw new Error("All fields are required");
	}

	// Create a new ticket with user ID and other details
	const ticket = await Ticket.create({
		user: req.user._id, // Extract the user ID from the request
		ticketType,
		priorityLevel,
		department,
		issueCategory,
		resolutionMethod,
		impact,
		description,
	});

	// Send the created ticket in the response
	res.status(201).json({ ticket });
});

// @desc     update new ticket
// @route    PUT api/tickets/:id
// @access   Private

const updateExistingTicket = asyncHandler(async (req, res) => {
	// Extract ticket ID from request parameters
	const { id } = req.params;
	// Check if ticket ID is provided
	if (!id) {
		res.status(400);
		throw new Error("Ticket ID not provided");
	}

	// Find ticket associated with the ID
	const ticket = await Ticket.findById(id);
	// If ticket not found, return 404
	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	// Check if the user is authorized to edit this ticket
	if (!ticket.user.equals(req.user.id)) {
		res.status(403);
		throw new Error("You are not authorized to edit this ticket");
	}

	// Update the ticket and get the updated document
	const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	// Send the updated ticket in the response
	res.status(200).json({ updatedTicket });
});

// @desc     Delete ticket ticket
// @route    DELETE api/tickets/:id
// @access   Private
const deleteTicket = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400);
		throw new Error("Ticket ID not provided");
	}

	// Find ticket associated with the ID
	const ticket = await Ticket.findById(id);
	// If ticket not found, return 404
	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	// Check if the user is authorized to edit this ticket
	if (!ticket.user.equals(req.user.id)) {
		res.status(403);
		throw new Error("You are not authorized to edit this ticket");
	}

	//Delete ticket
	await Ticket.findByIdAndDelete(id);

	// Send success message in the response
	res.status(200).json({ message: "Ticket deleted successfully" });
});

export {
	getUserTickets,
	getSingleTicket,
	createNewTicket,
	updateExistingTicket,
	deleteTicket,
};
