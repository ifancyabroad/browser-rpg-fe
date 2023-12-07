import { Box, Grid, Paper, Typography, alpha, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { BattleState, CharacterSheetTab } from "common/utils";
import { setCharacterSheetTab } from "features/character";
import { useEffect } from "react";
import { fetchBattle } from "./gameSlice";
import { Enemy } from "./Enemy";
import { openErrorModal, openGameOverModal, openRewardsModal } from "features/modals";
import { BattleDetails } from "./BattleDetails";

export const Battle: React.FC = () => {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const battle = useAppSelector((state) => state.game.battle);

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
				<Grid container spacing={2}>
					<Grid item xs={12} lg={7} order={{ lg: 1 }}>
						<Enemy />
					</Grid>
					<Grid item xs={12} lg={5}>
						<BattleDetails />
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};
