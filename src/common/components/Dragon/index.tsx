import { styled } from "@mui/material";
import dragon from "assets/images/dragon/Dragon_1_zejymo_c_scale,w_600.png";
import dragon2 from "assets/images/dragon/Dragon_1_zejymo_c_scale,w_1105.png";
import dragon3 from "assets/images/dragon/Dragon_1_zejymo_c_scale,w_1478.png";
import dragon4 from "assets/images/dragon/Dragon_1_zejymo_c_scale,w_1800.png";

const Image = styled("img")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	zIndex: -1,
});

export const Dragon: React.FC = () => {
	return (
		<Image
			src={dragon}
			alt="Red Dragon"
			sizes="(max-width: 1800px) 100vw, 1800px"
			srcSet={`${dragon} 600w, ${dragon2} 1105w, ${dragon3} 1478w, ${dragon4} 1800w`}
		/>
	);
};
