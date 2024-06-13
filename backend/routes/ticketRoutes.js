import express from "express";
import {
	getUserTickets,
	getSingleTicket,
	createNewTicket,
	updateExistingTicket,
	deleteTicket,
} from "../controllers/ticketController.js";
import { validateToken } from "../middleware/authToken.js";

const router = express.Router();

// Routes for getting and creating tickets
router
	.route("/")
	.get(validateToken, getUserTickets)
	.post(validateToken, createNewTicket);

// Route for getting a single ticket
router
	.route("/:id")
	.get(getSingleTicket)
	.put(validateToken, updateExistingTicket)
	.delete(validateToken, deleteTicket);

export { router as ticketRoutes };
