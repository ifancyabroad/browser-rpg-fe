import { styled } from "@mui/material";
import { TILE_SIZE } from "common/utils";

const Indicator = styled("div")({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	height: TILE_SIZE,
	width: TILE_SIZE,
	backgroundSize: "contain",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
});

interface IProps {
	image: string;
}

export const Player: React.FC<IProps> = ({ image }) => <Indicator sx={{ backgroundImage: `url(${image})` }} />;
