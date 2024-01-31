import { Box, styled } from "@mui/material";
import iconFrame from "assets/images/ui/IconFrame.png";

export const IconWrapper = styled(Box)({
	backgroundImage: `url(${iconFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "26px",
	height: "26px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "50%",
	boxShadow: "0 0 6px rgba(0,0,0,0.44)",
});
