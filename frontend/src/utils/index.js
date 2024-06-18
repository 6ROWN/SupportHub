export const formatDate = (dateString) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInMs = now - date;
	const diffInSeconds = Math.floor(diffInMs / 1000);
	const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
	const diffInHours = Math.floor(diffInMs / 1000 / 60 / 60);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} secs ago`;
	} else if (diffInMinutes < 60) {
		return `${diffInMinutes} mins ago`;
	} else if (diffInHours < 24) {
		return `${diffInHours} hrs ago`;
	} else {
		return date.toDateString();
	}
};
