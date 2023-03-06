import "../ErrorPage/ErrorPage.scss";
import ErrorPage from "../ErrorPage";
import { useLocation } from "react-router-dom";
import { ErrorPageProps } from "../ErrorPage/ErrorPage";
import { useMemo } from "react";

const GenericErrorPage = () => {
	const { state } = useLocation<ErrorPageProps>();

	const { title, errorCode, subtitle, description } = useMemo(() => {
		if (state) {
			return state;
		}

		return {
			title: "Whoops! Something went wrong",
			errorCode: null,
			subtitle: "Sorry about that",
			description: "",
		};
	}, [state]);

	return (
		<ErrorPage
			title={title}
			errorCode={errorCode}
			subtitle={subtitle}
			description={description}
		/>
	);
};

export default GenericErrorPage;
