import { Box, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { BattleState, CharacterSheetTab } from "common/utils";
import { setCharacterSheetTab } from "features/character";
import { useEffect } from "react";
import { fetchBattle } from "./gameSlice";
import { Enemy } from "./Enemy";
import { openBattleCompleteModal } from "features/modals";

export const Battle: React.FC = () => {
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
		if (battle?.state === BattleState.Complete) {
			dispatch(openBattleCompleteModal());
		}
	}, [dispatch, battle]);

	return (
		<Box p={2} flex={1} width="100%">
			<Paper
				sx={{
					position: "relative",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 2,
					p: 2,
				}}
			>
				<Box display="flex" justifyContent="space-between" width="100%">
					<div />
					<Enemy />
				</Box>
			</Paper>
		</Box>
	);
};
