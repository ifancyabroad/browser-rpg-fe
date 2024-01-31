import { Box, styled } from "@mui/material";
import contentFrame from "assets/images/ui/ModalContentFrame.png";

export const GameDialogContent = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundImage: `url(${contentFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	padding: theme.spacing(2),
	width: "458px",
	height: "535px",
	marginTop: "-15px",
	zIndex: 1,

	[theme.breakpoints.down("md")]: {
		width: "345px",
		height: "403px",
	},
}));
