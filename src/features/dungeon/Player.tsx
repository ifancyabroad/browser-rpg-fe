import { styled } from "@mui/material";
import { IPlayerLocation, TMap } from "common/types";

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
	backgroundSize: "cover",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	outline: "2px solid #7d623c",
	border: "1px solid #000",
	borderRadius: "50%",
}));

interface IProps {
	location: IPlayerLocation;
	level: TMap;
	animation: string;
	onAnimationEnd: () => void;
	image: string;
}

export const Player: React.FC<IProps> = ({ location, level, animation, onAnimationEnd, image }) => (
	<Indicator
		left={location.left}
		top={location.top}
		size={256 / level.length}
		onAnimationEnd={onAnimationEnd}
		sx={{ animation, backgroundImage: `url(${image})` }}
	/>
);
