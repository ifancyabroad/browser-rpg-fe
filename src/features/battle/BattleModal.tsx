import { Box, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openErrorModal, openGameOverModal, openRewardsModal } from "features/modals/modalsSlice";
import { BattleState } from "common/utils";
import { useEffect } from "react";
import { fetchBattle } from "./battleSlice";
import { ActionBar } from "./ActionBar";
import { Enemy } from "./Enemy";
import { BattleDetails } from "./BattleDetails";
import { Loader } from "common/components";

export const BattleModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.battleModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);

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
		if (battle.state === BattleState.Won) {
			dispatch(openRewardsModal());
		}
		if (battle.state === BattleState.Lost) {
			dispatch(openGameOverModal());
		}
	}, [dispatch, battle, open]);

	return (
		<Dialog open={open} maxWidth="md" scroll="body">
			<DialogContent>
				{battle ? (
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<BattleDetails />
						</Grid>
						<Grid item xs={12} md={6}>
							<Enemy />
						</Grid>
					</Grid>
				) : (
					<Box display="flex" justifyContent="center" alignItems="center" minHeight="550px">
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
