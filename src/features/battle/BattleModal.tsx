import { Box, Dialog, DialogActions, DialogContent, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openErrorModal, openGameOverModal, openRewardsModal, openVictoryModal } from "features/modals/modalsSlice";
import { BattleResult, FINAL_LEVEL } from "common/utils";
import { useEffect } from "react";
import { fetchBattle } from "./battleSlice";
import { ActionBar } from "./ActionBar";
import { Enemy } from "./Enemy";
import { Hero } from "./Hero";
import { Loader } from "common/components";
import { BattleStats } from "./BattleStats";
import { CombatLog } from "./CombatLog";

const BattleLoader: React.FC = () => {
	return (
		<Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
			<Loader />
		</Box>
	);
};

export const BattleModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.battleModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.modalStatus);
	const isLoading = status === "loading" || !battle;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		if (battle || !open) {
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
	}, [dispatch, battle, open]);

	useEffect(() => {
		if (!battle || !open) {
			return;
		}
		if (battle.result === BattleResult.Won) {
			dispatch(openRewardsModal());

			if (battle.level === FINAL_LEVEL) {
				dispatch(openVictoryModal());
			}
		}
		if (battle.result === BattleResult.Lost) {
			dispatch(openGameOverModal());
		}
	}, [dispatch, battle, open]);

	return (
		<Dialog open={open} maxWidth="md" fullScreen={isMobile}>
			{isLoading ? (
				// Empty layout to prevent jumping when loading
				<DialogContent sx={{ position: "relative" }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Stack height={{ sm: "100%" }} spacing={1}>
								<Box sx={{ height: { xs: 94, sm: 110 } }} />
								<Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />
							</Stack>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Stack spacing={1}>
								<Box sx={{ height: { xs: 94, sm: 110 } }} />
								<Box sx={{ height: 35.5 }} display={{ sm: "none" }} />
								<Box
									sx={{
										aspectRatio: "227/321",
										width: { sm: "80%" },
										height: { xs: 200, sm: "auto" },
										verticalAlign: "middle",
									}}
								/>
							</Stack>
						</Grid>
					</Grid>

					<BattleLoader />
				</DialogContent>
			) : (
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Stack height={{ sm: "100%" }} spacing={1}>
								<Hero />

								{!isMobile && <CombatLog />}
							</Stack>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Enemy />
						</Grid>
					</Grid>
				</DialogContent>
			)}
			<DialogActions>
				<Stack spacing={1} minHeight={96}>
					<BattleStats />
					<ActionBar />
				</Stack>
			</DialogActions>
		</Dialog>
	);
};
