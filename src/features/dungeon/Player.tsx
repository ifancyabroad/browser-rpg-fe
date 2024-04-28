import { styled } from "@mui/material";
import { IPlayerLocation, TMap } from "common/types";
import playerIcon from "assets/images/icons/character.svg";

interface IIndicatorProps {
	top: number;
	left: number;
	size: number;
}

const Indicator = styled("div", {
	shouldForwardProp: (prop) => !["top", "left", "size"].includes(prop as string),
})<IIndicatorProps>(({ theme, top, left, size }) => ({
	position: "absolute",
	top,
	left,
	transform: "translate(-50%, -50%)",
	height: size,
	width: size,
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
	},
}));

interface IProps {
	location: IPlayerLocation;
	level: TMap;
	animation: string;
	onAnimationEnd: () => void;
}

export const Player: React.FC<IProps> = ({ location, level, animation, onAnimationEnd }) => (
	<Indicator
		left={location.left}
		top={location.top}
		size={256 / level.length}
		onAnimationEnd={onAnimationEnd}
		sx={{ animation }}
	/>
);
