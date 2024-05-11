import { ButtonBase, styled } from "@mui/material";

interface IProps {
	component?: React.ElementType;
	disabled?: boolean;
	isActive?: boolean;
}

export const HoverButton = styled(ButtonBase, {
	shouldForwardProp: (prop) => !["isActive"].includes(prop as string),
})<IProps>(({ theme, isActive }) => ({
	cursor: "pointer",
	border: "1px solid transparent",
	textAlign: "inherit",
	"&:hover": {
		backgroundColor: "#000",
		borderColor: theme.palette.info.main,
	},
	backgroundColor: isActive ? "#000" : undefined,
	borderColor: isActive ? theme.palette.info.main : undefined,
}));

HoverButton.defaultProps = {
	disableRipple: true,
};
