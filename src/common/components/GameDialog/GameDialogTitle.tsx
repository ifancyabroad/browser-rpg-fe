import { Box, Typography, styled } from "@mui/material";
import titleFrame from "assets/images/ui/ModalTitleFrame.png";
import iconFrame from "assets/images/ui/ModalIconFrame.png";

const Wrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundImage: `url(${titleFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	padding: theme.spacing(2),
	paddingLeft: theme.spacing(6),
	width: "257px",
	height: "66px",
	display: "flex",
	alignItems: "center",
	zIndex: 2,
}));

const IconWrapper = styled(Box)({
	backgroundImage: `url(${iconFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	position: "absolute",
	top: 0,
	left: 0,
	transform: "translateX(-50%)",
	height: "75px",
	width: "75px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

interface IProps {
	title: string;
	icon: string;
}

export const GameModalTitle: React.FC<IProps> = ({ title, icon }) => (
	<Wrapper>
		<IconWrapper>
			<img src={icon} alt={title} width="45" />
		</IconWrapper>
		<Typography variant="h6">{title}</Typography>
	</Wrapper>
);
