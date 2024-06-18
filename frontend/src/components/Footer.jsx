// Footer.js
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-[#383185] text-white py-4">
			<div className="container mx-auto text-center">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} SupportHub. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
