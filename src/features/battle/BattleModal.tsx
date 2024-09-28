import {
	Box,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	Stack,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openErrorModal, openGameOverModal, openRewardsModal } from "features/modals/modalsSlice";
import { BattleResult } from "common/utils";
import { Fragment, useEffect } from "react";
import { fetchBattle } from "./battleSlice";
import { ActionBar } from "./ActionBar";
import { Enemy } from "./Enemy";
import { Hero } from "./Hero";
import { Loader } from "common/components";
import { MobileMenu } from "./MobileMenu";
import { BattleStats } from "./BattleStats";
import { CombatLog } from "./CombatLog";

export const BattleModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.battleModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.modalStatus);
	const isLoading = status === "loading";
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const isBattleStatsOpen = useAppSelector((state) => state.battle.isBattleStatsOpen);

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
		}
		if (battle.result === BattleResult.Lost) {
			dispatch(openGameOverModal());
		}
	}, [dispatch, battle, open]);

	return (
		<Dialog open={open} maxWidth="md" scroll="body" fullScreen={isMobile}>
			<DialogContent>
				{isLoading ? (
					<Box display="flex" justifyContent="center" alignItems="center" minHeight="616px">
						<Loader />
					</Box>
				) : battle ? (
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Stack height={{ md: "100%" }} spacing={1}>
								<MobileMenu />

								{isMobile && (
									<Collapse in={isBattleStatsOpen}>
										<BattleStats />
										<CombatLog />
									</Collapse>
								)}

								<Hero />

								{!isMobile && (
									<Fragment>
										<BattleStats />
										<CombatLog />
									</Fragment>
								)}
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							<Enemy />
						</Grid>
					</Grid>
				) : (
					<Box display="flex" justifyContent="center" alignItems="center" minHeight="616px">
						<Loader />
					</Box>
				)}
			</DialogContent>
			<DialogActions>
				<ActionBar />
			</DialogActions>
		</Dialog>
	);
};
