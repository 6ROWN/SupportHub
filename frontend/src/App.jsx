import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import GuessRoute from "./routes/GuessRoute";
import AuthRoute from "./routes/AuthRoute";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import CreateTicketForm from "./pages/tickets/CreateTicketForm";
import Tickets from "./pages/tickets/Tickets";
import SuccessMessage from "./components/SuccessMessage";
import SingleTicket from "./pages/tickets/SingleTicket";
import EditTicket from "./pages/tickets/EditTicket";

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route element={<AuthRoute />}>
							<Route path="/" element={<Home />} />
							<Route
								path="create"
								element={<CreateTicketForm />}
							/>
							<Route path="tickets" element={<Tickets />} />
							<Route
								path="ticket/:id"
								element={<SingleTicket />}
							/>
							<Route
								path="/editTicket/:id"
								element={<EditTicket />}
							/>
							<Route
								path="success"
								element={<SuccessMessage />}
							/>
							<Route
								path="*"
								element={<Navigate to="/" replace={true} />}
							/>
						</Route>

						<Route element={<GuessRoute />}>
							<Route path="/about" element={<Landing />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
