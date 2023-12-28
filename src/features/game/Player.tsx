import { keyframes, styled } from "@mui/material";
import { IPlayerLocation } from "common/types";
import playerIcon from "assets/images/icons/character.svg";

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

interface IIndicatorProps {
	top: number;
	left: number;
}

const Indicator = styled("div", {
	shouldForwardProp: (prop) => !["top", "left"].includes(prop as string),
})<IIndicatorProps>(({ theme, top, left }) => ({
	position: "absolute",
	top,
	left,
	transform: "translate(-50%, -50%)",
	height: "30px",
	width: "30px",
	":before": {
		content: "''",
		position: "relative",
		display: "block",
		width: "300%",
		height: "300%",
		marginLeft: "-100%",
		marginTop: "-100%",
		borderRadius: "50%",
		backgroundColor: theme.palette.primary.light,
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
		backgroundColor: theme.palette.primary.main,
		backgroundImage: `url(${playerIcon})`,
		backgroundSize: "60%",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		border: "2px solid transparent",
		borderRadius: "50%",
		boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.8), 0px 0px 0px 1px rgba(255,255,255,0.06)",
		animation: `${pulseDot} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite`,
	},
}));

interface IProps {
	location: IPlayerLocation;
	animation: string;
	onAnimationEnd: () => void;
}

export const Player: React.FC<IProps> = ({ location, animation, onAnimationEnd }) => (
	<Indicator left={location.left} top={location.top} onAnimationEnd={onAnimationEnd} sx={{ animation }} />
);
