import { Box, Typography } from "@mui/material";
import { CharacterSheet } from "features/character";

export const Game: React.FC = () => {
	return (
		<Box
			sx={{
				display: "flex",
			}}
		>
			<CharacterSheet />
			<Box
				sx={{
					flexGrow: 1,
					minHeight: "calc(100vh - 52px)",
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
		</Box>
	);
};
