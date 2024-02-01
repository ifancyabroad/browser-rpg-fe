import { Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { BattleState, CharacterSheetTab } from "common/utils";
import { setCharacterSheetTab } from "features/character";
import { useEffect } from "react";
import { fetchBattle } from "./battleSlice";
import { Enemy } from "./Enemy";
import { openErrorModal, openGameOverModal, openRewardsModal } from "features/modals";
import { BattleDetails } from "./BattleDetails";
import { ActionBar } from "./ActionBar";

export const Battle: React.FC = () => {
	const dispatch = useAppDispatch();
	const battle = useAppSelector((state) => state.battle.battle);

	useEffect(() => {
		dispatch(setCharacterSheetTab(CharacterSheetTab.Skills));
	}, [dispatch]);

	useEffect(() => {
		if (battle) {
			return;
		}

		const fetchData = async () => {
			try {
				await dispatch(fetchBattle()).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
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
		<Box py={2} flex={1} display="flex" flexDirection="column" width="100%">
			<Grid container spacing={2}>
				<Grid item xs={12} lg={7} order={{ lg: 1 }}>
					<Enemy />
				</Grid>
				<Grid item xs={12} lg={5}>
					<BattleDetails />
				</Grid>
			</Grid>

			<ActionBar />
		</Box>
	);
};
