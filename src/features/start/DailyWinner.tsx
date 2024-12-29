import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openCharacterModal } from "features/modals";

export const DailyWinner: React.FC = () => {
	const dispatch = useAppDispatch();
	const dailyWinner = useAppSelector((state) => state.character.dailyWinner);

	const handleViewWinner = () => {
		if (dailyWinner) {
			dispatch(openCharacterModal({ id: dailyWinner.id }));
		}
	};

	if (!dailyWinner) {
		return null;
	}

	return (
		<Stack spacing={2} width="100%">
			<Typography textAlign="center">
				Congratulations to yesterday's champion{" "}
				<Box component="span" color="text.secondary">
					{dailyWinner.username}!
				</Box>
			</Typography>
			<Paper
				sx={{
					width: "100%",
					py: 1,
					px: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 1,
				}}
			>
				<Link component="button" onClick={handleViewWinner}>
					{dailyWinner.name} the {dailyWinner.characterClass}
				</Link>
				<Typography>{dailyWinner.maxBattleLevel} kills</Typography>
			</Paper>
		</Stack>
	);
};
