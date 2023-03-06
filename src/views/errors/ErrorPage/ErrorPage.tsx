import React from "react";
import "./ErrorPage.scss";

export interface ErrorPageProps {
	errorCode: number | null;
	title: string;
	subtitle: string;
	description: string;
}

const ErrorPage = (
	{ errorCode, title, subtitle, description }: ErrorPageProps = {
		errorCode: null,
		title: "Whoops! Something went wrong",
		subtitle: "Sorry about that",
		description: "",
	}
) => {
	console.log(errorCode, title, subtitle, description);

	return (
		<main className="error-page__container">
			{(errorCode || title) && (
				<h1 className={`${errorCode ? "error-page__error-code" : ""}`}>
					{errorCode ? errorCode : title}
				</h1>
			)}
			{subtitle && <h2>{subtitle}</h2>}
			{description && <p className="error-page__description">{description}</p>}
		</main>
	);
};

export default ErrorPage;
