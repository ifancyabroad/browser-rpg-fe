import { Paper, styled } from "@mui/material";

export const GameDialogPaper = styled(Paper)(({ theme }) => ({
	background: "none",
	boxShadow: "none",
	margin: "0!important",
	paddingLeft: theme.spacing(5),
	paddingRight: theme.spacing(5),
}));
