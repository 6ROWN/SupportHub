import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	isAuthenticated: false,
	isLoading: false,
	isError: false,
	message: "",
};

// Register user
export const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			const response = await authService.register(userData);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message ||
					error.message ||
					"Registration failed"
			);
		}
	}
);

// Login user
export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			const response = await authService.login(userData);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message || "Login failed"
			);
		}
	}
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
	await authService.logout();
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.isLoading = false;
			state.isError = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			// Register
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload;
				state.isError = false;
				state.message = "";
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload;
				state.isError = false;
				state.message = "";
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			// Logout
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
