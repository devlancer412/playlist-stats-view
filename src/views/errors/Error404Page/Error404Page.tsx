import "../ErrorPage/ErrorPage.scss";
import ErrorPage from "../ErrorPage";

const Error404Page = () => {
	return (
		<ErrorPage
			title=""
			errorCode={404}
			subtitle="Playlist Not Found"
			description="This Playlist has expired, or is no longer available. Please contact the person who sent you the link for a new mixtape."
		/>
	);
};

export default Error404Page;
