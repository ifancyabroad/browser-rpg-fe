import { ButtonBase, ButtonBaseProps, styled } from "@mui/material";
import buttonFrame from "assets/images/ui/ModalCloseIconFrame.png";
import { ReactComponent as CrossIcon } from "assets/images/ui/CrossIcon.svg";

const Wrapper = styled(ButtonBase)({
	backgroundImage: `url(${buttonFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "36px",
	height: "36px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
	top: "-12px",
	right: "-12px",
	zIndex: 2,
});

export const GameDialogCloseButton: React.FC<ButtonBaseProps> = (props) => (
	<Wrapper {...props}>
		<CrossIcon width={24} height={24} />
	</Wrapper>
);
