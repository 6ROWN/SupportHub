import React from "react";
import {
	UserIcon,
	EnvelopeIcon,
	ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

const ProfileModal = ({ user, logout }) => {
	return (
		<div className="absolute min-w-[250px] top-10 -right-10 bg-slate-50 p-2 rounded-md shadow-md z-20 space-y-1">
			<div
				className="p-2 flex items-center space-x-4 bg-gray-200 rounded-lg
                "
			>
				<UserIcon className="size-5 text-[#6f6f6f]" />
				<h1 className="text-sm font-medium text-[#2f2f2f]">
					{user.firstName} {user.lastName}
				</h1>
			</div>
			<div
				className="p-2 flex items-center space-x-4 bg-gray-200 rounded-lg
                "
			>
				<EnvelopeIcon className="size-5 text-[#6f6f6f]" />
				<h1 className="text-sm font-medium text-[#2f2f2f]">
					{user.email}
				</h1>
			</div>
			<div
				onClick={logout}
				className="p-2 flex items-center space-x-4 bg-red-400 hover:bg-red-600 rounded-lg
                "
			>
				<ArrowLeftStartOnRectangleIcon className="size-5 text-white rotate-180" />
				<h1 className="text-sm font-medium text-white">Log out</h1>
			</div>
		</div>
	);
};

export default ProfileModal;
