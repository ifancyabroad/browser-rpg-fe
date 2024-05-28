import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeBattleModal, closeRewardsModal } from "./modalsSlice";

export const RewardsModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.rewardsModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";

	const handleCompleteBattle = async () => {
		dispatch(closeBattleModal());
		dispatch(closeRewardsModal());
	};

	if (!battle || !battle.reward) {
		return null;
	}

	const { experience, gold } = battle.reward;
	const { name } = battle.enemy;

	return (
		<Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs">
			<DialogTitle id="form-dialog-title" textAlign="center">
				Victory!
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center">
					You have defeated the{" "}
					<Box component="span" color="primary.main">
						{name}
					</Box>
					. You gain{" "}
					<Box component="span" color="text.secondary">
						{experience} experience
					</Box>{" "}
					and{" "}
					<Box component="span" color="text.secondary">
						{gold} gold
					</Box>
					.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleCompleteBattle} disabled={isLoading}>
					Confirm
				</Link>
			</DialogActions>
		</Dialog>
	);
};
