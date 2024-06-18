import axios from "axios";

//Create Ticket
const createTicket = async (ticketData, token) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}/api/tickets`,
			ticketData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

//Get user tickets
const getTickets = async (token) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_URL}/api/tickets`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

//Get single Ticket
const getTicket = async (ticketId, token) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_URL}/api/tickets/${ticketId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const editTicket = async (ticketId, ticketData, token) => {
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_SERVER_URL}/api/tickets/${ticketId}`,
			ticketData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteTicket = async (ticketId, token) => {
	try {
		const response = await axios.delete(
			`${import.meta.env.VITE_SERVER_URL}/api/tickets/${ticketId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const ticketService = {
	createTicket,
	getTickets,
	getTicket,
	editTicket,
	deleteTicket,
};
