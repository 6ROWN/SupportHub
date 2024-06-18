import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ticketService } from "./ticketService";

const initialState = {
	tickets: [],
	ticket: {},
	isSuccess: false,
	isLoading: false,
	isError: false,
	message: "",
};

// Create new Ticket
const createTicket = createAsyncThunk(
	"ticket/create",
	async (ticketData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.createTicket(ticketData, token);
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Ticket creation failed";
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

// Get User Tickets
const getTickets = createAsyncThunk("ticket/getAll", async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await ticketService.getTickets(token);
	} catch (error) {
		const errorMessage =
			error.response?.data?.message ||
			error.message ||
			"Fetching tickets failed";
		return thunkAPI.rejectWithValue(errorMessage);
	}
});

// Get single Ticket
const getTicket = createAsyncThunk(
	"ticket/getTicket",
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.getTicket(ticketId, token);
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Fetching ticket failed";
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

// Edit ticket
const editTicket = createAsyncThunk(
	"ticket/editTicket",
	async ({ ticketId, ticketData }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.editTicket(ticketId, ticketData, token);
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Editing ticket failed";
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

//Delete ticket
const deleteTicket = createAsyncThunk(
	"ticket/deleteTicket",
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.deleteTicket(ticketId, token);
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Deleting ticket failed";
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Creating tickets
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = "";
			})
			.addCase(createTicket.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tickets.push(action.payload.tickets);
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// Get user tickets
			.addCase(getTickets.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = "";
			})
			.addCase(getTickets.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tickets = action.payload.tickets; // Ensure we access the nested tickets array
			})
			.addCase(getTickets.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// Get single ticket
			.addCase(getTicket.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = "";
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.ticket = action.payload.ticket;
			})
			.addCase(getTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// Edit ticket
			.addCase(editTicket.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = "";
			})
			.addCase(editTicket.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// Ensure state.tickets is always an array before using map
				if (Array.isArray(state.tickets)) {
					state.tickets = state.tickets.map((ticket) =>
						ticket._id === action.payload._id
							? action.payload
							: ticket
					);
				}
				// Update the current ticket in the state
				state.ticket = action.payload;
			})
			.addCase(editTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// Deleting a ticket
			.addCase(deleteTicket.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = "";
			})
			.addCase(deleteTicket.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// Remove the deleted ticket from state.tickets
				state.tickets = state.tickets.filter(
					(ticket) => ticket._id !== action.payload._id
				);
				state.ticket = action.payload.tickets; // Update the current ticket in the state if needed
			})
			.addCase(deleteTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = ticketSlice.actions;
export { createTicket, getTickets, getTicket, editTicket, deleteTicket };
export default ticketSlice.reducer;
