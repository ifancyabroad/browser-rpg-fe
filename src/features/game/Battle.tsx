import { Box, Paper, Typography, alpha, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { BattleState, CharacterSheetTab } from "common/utils";
import { setCharacterSheetTab } from "features/character";
import { useEffect } from "react";
import { fetchBattle } from "./gameSlice";
import { Enemy } from "./Enemy";
import { openGameOverModal, openRewardsModal } from "features/modals";
import { BattleDetails } from "./BattleDetails";

export const Battle: React.FC = () => {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const battle = useAppSelector((state) => state.game.battle);

	useEffect(() => {
		dispatch(setCharacterSheetTab(CharacterSheetTab.Skills));
	}, [dispatch]);

	useEffect(() => {
		if (!battle) {
			dispatch(fetchBattle());
		}
	}, [dispatch, battle]);

	useEffect(() => {
		if (battle?.state === BattleState.Won) {
			dispatch(openRewardsModal());
		}
		if (battle?.state === BattleState.Lost) {
			dispatch(openGameOverModal());
		}
	}, [dispatch, battle]);

	return (
		<Box p={2} flex={1} display="flex" flexDirection="column" width="100%">
			<Typography variant="h2">Arena</Typography>
			<Paper
				sx={{
					backgroundColor: alpha(theme.palette.background.paper, 0.5),
					position: "relative",
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 2,
					p: 2,
				}}
			>
				<Box display="flex" justifyContent="center" gap={3} width="100%">
					<BattleDetails />
					<Enemy />
				</Box>
			</Paper>
		</Box>
	);
};
