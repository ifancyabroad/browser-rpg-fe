import { Box, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { Status } from "common/utils";
import { CharacterSheet } from "features/character";
import { Navigate } from "react-router-dom";

export const Game: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return <Navigate to="/" />;
	}

	if (character.status === Status.Retired) {
		return <Navigate to="/" />;
	}

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
					height: "calc(100vh - 52px)",
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
