import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const validateToken = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith("Bearer")) {
		res.status(401);
		throw new Error("Not authorized");
	}

	const token = authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select("-password");
		if (!user) {
			throw new Error("User not found");
		}
		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.status(401);
		throw new Error("Invalid token");
	}
});

export { validateToken };
