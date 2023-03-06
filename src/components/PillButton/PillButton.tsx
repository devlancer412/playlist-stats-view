import React from "react";
import { Button as BSButton, Spinner } from "react-bootstrap";
import "./PillButton.scss";

type PillButtonProps = {
	onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
	children: React.ReactNode;
	isDisabled?: boolean;
	isLoading?: boolean;
	style?: React.CSSProperties;
	className?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
};

const PillButton = ({
	onClick,
	children,
	isDisabled = false,
	isLoading = false,
	style = {},
	className = "",
	leftIcon,
	rightIcon,
	type = "button",
}: PillButtonProps) => {
	return (
		<BSButton
			className={`pill-button ${className}`}
			style={{ ...style }}
			disabled={isDisabled || isLoading}
			onClick={onClick}
			type={type}
		>
			{isLoading && <Spinner animation="border" size="sm" className="me-2" />}
			{leftIcon && leftIcon}
			{children}
			{rightIcon && rightIcon}
		</BSButton>
	);
};

export default PillButton;
