import { styled } from "@mui/material";
import { IPlayerLocation } from "common/types";

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
	backgroundSize: "contain",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
}));

interface IProps {
	location: IPlayerLocation;
	image: string;
}

export const Player: React.FC<IProps> = ({ location, image }) => (
	<Indicator left={location.left} top={location.top} size={64} sx={{ backgroundImage: `url(${image})` }} />
);
