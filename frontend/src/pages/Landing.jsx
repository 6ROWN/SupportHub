import {
	ArrowPathIcon,
	EnvelopeIcon,
	FolderOpenIcon,
	LockClosedIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<>
			<div>
				{/* Hero Section */}
				<section className="relative bg-[url('https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center bg-no-repeat h-screen">
					<div className="absolute inset-0 bg-black opacity-50"></div>
					<div className="relative z-10 flex items-center justify-center h-full">
						<div className="text-center text-white max-w-2xl mx-auto">
							<h1 className="text-4xl font-bold mb-4">
								Welcome to IT Help Desk Support
							</h1>
							<p className="mb-6">
								We provide comprehensive IT support to ensure
								your systems run smoothly.
							</p>
							<Link to="/login">
								<button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
									Get Started
								</button>
							</Link>
						</div>
					</div>
				</section>

				{/* Services Section */}
				<section className="py-16 px-12 bg-gray-100">
					<div className="container mx-auto px-6">
						<h2 className="text-3xl font-bold text-center mb-12">
							Our Services
						</h2>
						<div className="flex flex-wrap -mx-4">
							<div className="w-full md:w-1/3 px-4 mb-8">
								<div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center space-y-4">
									<img
										width="64"
										height="64"
										src="https://img.icons8.com/external-smashingstocks-basic-outline-smashing-stocks/53/external-Customer-Support-machine-learning-icon-smashingstocks-basic-outline-smashing-stocks.png"
										alt="external-Customer-Supports"
									/>
									<h3 className="text-xl font-bold mb-4">
										Technical Support
									</h3>
									<p>
										From troubleshooting to system upgrades,
										our team is here to help you with all
										your technical needs.
									</p>
								</div>
							</div>
							<div className="w-full md:w-1/3 px-4 mb-8">
								<div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center space-y-4">
									<img
										width="64"
										height="64"
										src="https://img.icons8.com/glyph-neue/64/thin-client.png"
										alt="thin-client"
									/>
									<h3 className="text-xl font-bold mb-4">
										Network Management
									</h3>
									<p>
										We provide network setup, monitoring,
										and management to ensure your business
										stays connected.
									</p>
								</div>
							</div>
							<div className="w-full md:w-1/3 px-4 mb-8">
								<div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center space-y-4">
									<LockClosedIcon className="w-16 h-16" />
									<h3 className="text-xl font-bold">
										Security Solutions
									</h3>
									<p>
										Our security experts can help protect
										your business from cyber threats and
										data breaches.
									</p>
								</div>
							</div>
							<div className="w-full md:w-1/3 px-4 mb-8">
								<div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center space-y-4">
									<EnvelopeIcon className="w-16 h-16" />
									<h3 className="text-xl font-bold">
										Email management
									</h3>
									<p>
										Our IT help desk offers complete email
										management, including setup,
										troubleshooting, and spam protection.
									</p>
								</div>
							</div>
							<div className="w-full md:w-1/3 px-4 mb-8">
								<div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center space-y-4">
									<ArrowPathIcon className="w-16 h-16" />
									<h3 className="text-xl font-bold">
										Change management
									</h3>
									<p>
										Plan, analyze, and implement IT changes
										with visual workflows.
									</p>
								</div>
							</div>
							<div className="w-full md:w-1/3 px-4 mb-8">
								<div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center space-y-4">
									<FolderOpenIcon className="w-16 h-16" />
									<h3 className="text-xl font-bold">
										IT Project management
									</h3>
									<p>
										Organize and assign tasks efficiently.
										Connect projects with changes and issues
										to enhance IT service delivery.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section className="py-16 bg-white">
					<div className="container mx-auto px-6">
						<h2 className="text-3xl font-bold text-center mb-8">
							Get in Touch
						</h2>
						<form className="max-w-lg mx-auto">
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Name
								</label>
								<input
									type="text"
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Email
								</label>
								<input
									type="email"
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Message
								</label>
								<textarea
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									rows="4"
								></textarea>
							</div>
							<button
								type="submit"
								className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								Send Message
							</button>
						</form>
					</div>
				</section>
			</div>
		</>
	);
};

export default Landing;
