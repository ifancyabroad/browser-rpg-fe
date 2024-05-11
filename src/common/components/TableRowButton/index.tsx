import { TableRow, styled } from "@mui/material";

export const TableRowButton = styled(TableRow)(({ theme }) => ({
	cursor: "pointer",
	border: "1px solid transparent",
	"&:hover": {
		backgroundColor: "#000",
		borderColor: theme.palette.info.main,
	},
}));
