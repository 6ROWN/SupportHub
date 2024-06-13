import mongoose from "mongoose";
import User from "./userModel.js";

// Define enums for various fields
const TicketTypeEnum = [
	"Inquiry",
	"Request",
	"Incident",
	"Problem",
	"Change Request",
];
const PriorityLevelEnum = ["Low", "Medium", "High", "Critical"];
const StatusEnum = [
	"New",
	"Open",
	"Pending",
	"Resolved",
	"Closed",
	"On Hold",
	"Cancelled",
];
const DepartmentEnum = [
	"IT",
	"HR",
	"Finance",
	"Facilities",
	"Customer Service",
	"Marketing",
	"Sales",
];
const IssueCategoryEnum = [
	"Hardware",
	"Software",
	"Network",
	"Security",
	"Account Access",
	"Other",
];
const ResolutionMethodEnum = ["Phone", "Email", "In Person", "Remote"];
const ImpactEnum = ["Individual", "Department", "Organization"];

const TicketSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: User,
		},
		ticketType: {
			type: String,
			required: true,
			enum: TicketTypeEnum,
		},
		priorityLevel: {
			type: String,
			required: true,
			enum: PriorityLevelEnum,
		},
		status: {
			type: String,
			enum: StatusEnum,
			default: "New",
		},
		department: {
			type: String,
			required: true,
			enum: DepartmentEnum,
		},
		issueCategory: {
			type: String,
			required: true,
			enum: IssueCategoryEnum,
		},
		resolutionMethod: {
			type: String,
			enum: ResolutionMethodEnum,
		},
		impact: {
			type: String,
			required: true,
			enum: ImpactEnum,
		},

		description: {
			type: String,
			required: [true, "Please enter a description of the issue"],
		},
	},
	{
		timestamps: true,
	}
);

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
