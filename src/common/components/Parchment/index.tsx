import { Paper, styled } from "@mui/material";
import parchment from "assets/images/ui/Parchment.png";

export const Parchment = styled(Paper)(({ theme }) => ({
	backgroundColor: "transparent",
	boxShadow: "none",
	backgroundImage: `url(${parchment})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	height: "100%",
	padding: theme.spacing(4),
	color: "#1f1f1f",
	filter: "drop-shadow(31.128px 21.796px 18px rgba(0,0,0,0.75))",
	overflowY: "auto",
}));
