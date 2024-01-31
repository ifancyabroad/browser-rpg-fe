import { Box, ButtonBase, ButtonBaseProps, styled } from "@mui/material";
import buttonFrame from "assets/images/ui/ModalButtonFrame.png";

const Wrapper = styled(ButtonBase)(({ theme }) => ({
	backgroundImage: `url(${buttonFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "140px",
	height: "55px",
	fontFamily: "'Cinzel', serif",
	padding: theme.spacing(1.5),
}));

export const GameDialogButton: React.FC<ButtonBaseProps> = ({ children, ...rest }) => (
	<Wrapper {...rest}>
		<Box
			sx={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: 2,
				height: "100%",
				backgroundColor: "#2a2825",
			}}
		>
			{children}
		</Box>
	</Wrapper>
);
