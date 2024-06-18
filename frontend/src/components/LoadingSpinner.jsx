import React from "react";
import { CogIcon } from "@heroicons/react/24/solid";

const LoadingSpinner = () => {
	return (
		<div className="flex justify-center items-center">
			<div className="animate-spin rounded-full h-16 w-16 ">
				<CogIcon className="bg-white rounded-full text-blue-300" />
			</div>
		</div>
	);
};

export default LoadingSpinner;
