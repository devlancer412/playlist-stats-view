import { useEffect } from "react";
import { Route } from "react-router-dom";

interface Props {
	exact?: boolean;
	link: string;
	path: string;
	sensitive?: boolean;
	strict?: boolean;
}

const RedirectingComponent = (props: Props) => {
	useEffect(() => {
		window.location.replace(props.link);
	}, [props.link]);

	return (
		<main className="d-flex align-items-center justify-content-center h-100 w-100">
			<h1>Redirecting...</h1>
		</main>
	);
};

const ExternalRedirect: React.FC<Props> = (props: Props) => {
	const { link, ...routeProps } = props;

	return (
		<Route
			{...routeProps}
			component={() => <RedirectingComponent {...props} />}
		/>
	);
};

export default ExternalRedirect;
