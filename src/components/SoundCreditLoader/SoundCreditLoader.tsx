import React from "react";
import Lottie from "lottie-react";
import "./SoundCreditLoader.scss";
import darkAnimationData from "@assets/lottie/whiteLoaderOnDarkGrey.json";
import purpleAnimationData from "@assets/lottie/whiteLoaderOnPurple.json";
import lightAnimationData from "@assets/lottie/blackLoaderOnLightGrey.json";

const selectAnimationStyle = (theme: string) => {
	switch (theme) {
		case "dark":
			return darkAnimationData;
		case "purple":
			return purpleAnimationData;
		case "light":
		default:
			return lightAnimationData;
	}
};

type SoundCreditLoaderProps = {
	theme?: string;
	message?: string;
	style?: React.CSSProperties;
	height?: string | number;
	width?: string | number;
};

const SoundCreditLoader = ({
	theme = "light",
	message = "",
	style = {},
	height = "11rem",
	width = "11rem",
}: SoundCreditLoaderProps) => {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				...style,
			}}
			className={`d-flex flex-column justify-content-center align-items-center`}
		>
			<Lottie
				animationData={selectAnimationStyle(theme)}
				loop
				autoplay
				rendererSettings={{
					preserveAspectRatio: "xMidYMid slice",
				}}
				style={{ cursor: "default", width, height }}
			/>

			{message && (
				<p className="mb-0 sound-credit-loader__message">{message}</p>
			)}
		</div>
	);
};

export default SoundCreditLoader;
