import { Paper, alpha, styled } from "@mui/material";

export const TransparentPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: alpha(theme.palette.background.paper, 0.5),
	position: "relative",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	gap: 2,
	p: 2,
}));
