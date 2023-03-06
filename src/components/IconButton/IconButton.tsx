import "./IconButton.scss";

interface IconButtonProps {
	icon: string;
}

const IconButton = (props: IconButtonProps) => {
	const { icon } = props;
	return (
		<div className={`btn-icon`}>
			<img src={icon} alt={`img-${icon}`} />
		</div>
	);
};

export default IconButton;
