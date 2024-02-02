import React from "react";
import { Box, ButtonBase, ButtonBaseProps, darken, styled } from "@mui/material";
import buttonFrame from "assets/images/ui/ButtonFrame.png";
import leftPointer from "assets/images/ui/ButtonLeftPointer.png";
import rightPointer from "assets/images/ui/ButtonRightPointer.png";

const Wrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundImage: `url(${buttonFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "248px",
	height: "51px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: theme.spacing(1.25),
}));

const LeftPointer = styled("img")({
	position: "absolute",
	left: "6px",
	top: "50%",
	transform: "translateY(-50%)",
	zIndex: 1,
});

const RightPointer = styled("img")({
	position: "absolute",
	right: "6px",
	top: "50%",
	transform: "translateY(-50%)",
	zIndex: 1,
});

const StyledButton = styled(ButtonBase)(({ theme }) => ({
	filter: "drop-shadow(0px 20px 6px rgba(0,0,0,0.4))",
	border: "2px solid",
	borderColor: theme.palette.primary.main,
	backgroundColor: darken(theme.palette.primary.main, 0.2),
	padding: 0,
	height: "100%",
	width: "100%",
	fontFamily: theme.typography.fontFamily,

	"&:hover": {
		backgroundColor: theme.palette.primary.dark,
	},
}));

export const GameButton: React.FC<ButtonBaseProps> = (props) => (
	<Wrapper>
		<LeftPointer src={leftPointer} alt="" role="presentation" width="13" />
		<StyledButton {...props} />
		<RightPointer src={rightPointer} alt="" role="presentation" width="13" />
	</Wrapper>
);
