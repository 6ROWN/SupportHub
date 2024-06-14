import asyncHandler from "express-async-handler";
import validator from "validator";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc    Register a new user
// @route   POST api/user/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Check if all required fields are provided
	if (!firstName || !lastName || !email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	// Validate email
	if (!validator.isEmail(email)) {
		res.status(400);
		throw new Error("Email is not valid");
	}

	// Validate password strength
	if (!validator.isStrongPassword(password)) {
		res.status(400);
		throw new Error(
			"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
		);
	}

	// Check if user with the provided email already exists
	let user = await User.findOne({ email });
	if (user) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create a new user
	user = await User.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
	});

	if (user) {
		const token = generateToken(user._id);
		return res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

//@desc     Login user
//@route    POST api/user/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check if email and password are provided
	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	// Check if user with the provided email exists
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	// Check if the provided password matches the hashed password
	const matchedPassword = await bcrypt.compare(password, user.password);
	if (!matchedPassword) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	// Generate a token for the authenticated user
	const token = generateToken(user._id);
	return res
		.status(200)
		.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token,
		});
});

// Function to generate a JWT token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

export { registerUser, loginUser };
