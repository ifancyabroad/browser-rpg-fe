import { ButtonBase, styled } from "@mui/material";

export const HoverButton = styled(ButtonBase)(({ theme }) => ({
	cursor: "pointer",
	border: "1px solid transparent",
	textAlign: "inherit",
	"&:hover": {
		backgroundColor: "#000",
		borderColor: theme.palette.info.main,
	},
}));

HoverButton.defaultProps = {
	disableRipple: true,
};
