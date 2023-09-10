import { Box, Typography, darken, useTheme } from "@mui/material";
import { useAppSelector } from "common/hooks";

export const CharacterSheet: React.FC = () => {
	const theme = useTheme();
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	return (
		<Box
			sx={{
				minHeight: "calc(100vh - 52px)",
				width: "400px",
				bgcolor: darken(theme.palette.background.paper, 0.25),
				p: 2,
			}}
		>
			<Typography variant="h4">{character.name}</Typography>
		</Box>
	);
};
