import { Box, Typography } from "@mui/material";

export const Game: React.FC = () => {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Typography variant="h5">BROWSER HEROES</Typography>
			<Typography>This is the game page!</Typography>
		</Box>
	);
};
