import { keyframes, styled } from "@mui/material";

const pulseRing = keyframes`
  0% {
    transform: scale(.33);
  }
  80%, 100% {
    opacity: 0;
  }
`;

const pulseDot = keyframes`
  0% {
    transform: scale(.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.8);
  }
`;

interface IProps {
	top: number;
	left: number;
}

export const Player = styled("div", {
	shouldForwardProp: (prop) => !["top", "left"].includes(prop as string),
})<IProps>(({ top, left }) => ({
	position: "absolute",
	top,
	left,
	transform: "translate(-50%, -50%)",
	height: "30px",
	width: "30px",
	transition: "all 0.4s ease-in-out",
	":before": {
		content: "''",
		position: "relative",
		display: "block",
		width: "300%",
		height: "300%",
		marginLeft: "-100%",
		marginTop: "-100%",
		borderRadius: "50%",
		backgroundColor: "#01a4e9",
		animation: `${pulseRing} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite`,
	},
	":after": {
		content: "''",
		position: "absolute",
		left: 0,
		top: 0,
		display: "block",
		width: "100%",
		height: "100%",
		backgroundColor: "white",
		borderRadius: "50%",
		boxShadow: "0 0 8px rgba(0,0,0,.3)",
		animation: `${pulseDot} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite`,
	},
}));
