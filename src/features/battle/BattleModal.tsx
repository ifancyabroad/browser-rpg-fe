import { Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeBattleModal, openErrorModal, openGameOverModal, openRewardsModal } from "features/modals/modalsSlice";
import { BattleState } from "common/utils";
import { useEffect } from "react";
import { fetchBattle } from "./battleSlice";
import { ActionBar } from "./ActionBar";
import { Enemy } from "./Enemy";
import { BattleDetails } from "./BattleDetails";

export const BattleModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.battleModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);

	const handleClose = () => {
		dispatch(closeBattleModal());
	};

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
		if (battle?.state === BattleState.Won) {
			dispatch(openRewardsModal());
		}
		if (battle?.state === BattleState.Lost) {
			dispatch(openGameOverModal());
		}
	}, [dispatch, battle]);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" scroll="body">
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<BattleDetails />
					</Grid>
					<Grid item xs={12} md={6}>
						<Enemy />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<ActionBar />
			</DialogActions>
		</Dialog>
	);
};
