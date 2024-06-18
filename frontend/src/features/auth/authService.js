import axios from "axios";
console.log(import.meta.env.VITE_SERVER_URL);

// Register a new user
const register = async (userData) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}/api/user`,
			userData
		);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		// console.error(
		// 	"Error registering user:",
		// 	error.response ? error.response.data : error.message
		// );
		throw error;
	}
};

// Login user
const login = async (userData) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}/api/user/login`,
			userData
		);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		// console.error(
		// 	"Error login user:",
		// 	error.response ? error.response.data : error.message
		// );
		throw error;
	}
};

// Logout user
const logout = () => {
	localStorage.removeItem("user");
};

const authService = { register, login, logout };

export default authService;
