import { keyframes, styled } from "@mui/material";

const eyeShade = keyframes`
    0%   { transform: translateY(0)}
    20%   { transform: translateY(5px)}
    40% , 50%   { transform: translateY(-5px)}
    60%   { transform: translateY( -8px)}
    75%   { transform: translateY( 5px)}
    100%   { transform: translateY(10px)}
`;
const eyeMove = keyframes`
    0%   { transform: translate(0 , 0)}
    20%   { transform: translate(0px , 5px)}
    40% , 50%   { transform: translate(0px , -5px)}
    60%   { transform: translate(-10px , -5px)}
    75%   { transform: translate(-20px , 5px)}
    100%   { transform: translate(0 , 10px)}
`;

export const Loader = styled("span")({
	position: "relative",
	width: "78px",
	height: "78px",
	borderRadius: "50%",
	background: "#fff",
	border: "8px solid #131a1d",
	overflow: "hidden",
	boxSizing: "border-box",
	":after": {
		content: "''",
		position: "absolute",
		left: 0,
		top: "-50%",
		width: "100%",
		height: "100%",
		background: "#263238",
		zIndex: 5,
		borderBottom: "8px solid #131a1d",
		boxSizing: "border-box",
		animation: `${eyeShade} 3s infinite`,
	},
	":before": {
		content: "''",
		position: "absolute",
		left: "20px",
		bottom: "15px",
		width: "32px",
		zIndex: 2,
		height: "32px",
		background: "#111",
		borderRadius: "50%",
		animation: `${eyeMove} 3s infinite`,
	},
});
