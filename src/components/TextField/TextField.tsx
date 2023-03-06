import React from "react";
import { Form } from "react-bootstrap";
import "./TextField.scss";

interface TextFieldProps {
	className?: string;
	inputClassName?: string;
	value: any;
	type?: string;
	as?: React.ElementType;
	placeholder?: string;
	id?: string;
	rows?: any;
	cols?: any;
	onChange: React.ChangeEventHandler;
	onBlur?: React.FocusEventHandler;
	isValid?: boolean;
	isInvalid?: boolean;
	label?: string;
	name?: string;
	errorMessage?: string;
	min?: number;
	max?: number;
	step?: number;
	dense?: boolean;
	isDisabled?: boolean;
	readOnly?: boolean;
	onClick?: React.MouseEventHandler;
	required?: boolean;
	selectableLabel?: boolean;
	maxLength?: number;
	informationText?: string;
	autoComplete?: string;
	outerStyle?: React.CSSProperties;
	labelStyle?: React.CSSProperties;
	inputStyle?: React.CSSProperties;
}

const TextField = ({
	className = "",
	inputClassName = "",
	value,
	type,
	as,
	placeholder,
	id,
	rows,
	cols,
	onChange,
	onBlur,
	isValid,
	isInvalid,
	label,
	name,
	errorMessage,
	min,
	max,
	step,
	dense,
	isDisabled,
	readOnly,
	onClick,
	required,
	selectableLabel,
	maxLength,
	informationText = "",
	autoComplete = "on",
	outerStyle = {},
	labelStyle = {},
	inputStyle = {},
}: TextFieldProps) => {
	return (
		<Form.Group
			className={`${className} ${dense ? "mb-0" : ""} `}
			style={{ marginBottom: "1.5rem", ...outerStyle }}
		>
			{label && (
				<Form.Label
					style={{
						...(selectableLabel ? { userSelect: "text", cursor: "text" } : {}),
						...labelStyle,
					}}
					htmlFor={name}
				>
					{label}
				</Form.Label>
			)}

			<div style={{ flex: 1, position: "relative" }}>
				<Form.Control
					style={{
						...inputStyle,
					}}
					readOnly={readOnly}
					disabled={isDisabled}
					id={id}
					rows={rows}
					autoComplete={autoComplete}
					cols={cols}
					type={type}
					name={name}
					value={value}
					as={as}
					min={min}
					max={max}
					step={step}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					isValid={isValid}
					isInvalid={isInvalid}
					onClick={onClick}
					required={required}
					onWheel={(e) => e.currentTarget.blur()}
					maxLength={maxLength}
					className={inputClassName}
				/>
				{errorMessage && (
					<Form.Control.Feedback
						style={{ height: informationText ? "auto" : 0 }}
						type="invalid"
					>
						{errorMessage}
					</Form.Control.Feedback>
				)}
				{/* {showEyeToggle && (
						<IconButton
							onClick={toggleShowPassword}
							icon={`fas fa-${showPassword ? 'eye-slash' : 'eye'}
				`}
							style={{ position: 'absolute', right: 0, top: 0, width: 40 }}
						/>
					)} */}
			</div>

			{informationText && (
				<Form.Text className="text-muted">{informationText}</Form.Text>
			)}
		</Form.Group>
	);
};

export default TextField;
