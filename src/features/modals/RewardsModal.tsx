import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeRewardsModal } from "./modalsSlice";
import { useNavigate } from "react-router-dom";

export const RewardsModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.modals.rewardsModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";

	const handleCompleteBattle = async () => {
		dispatch(closeRewardsModal());
		navigate("/game");
	};

	if (!battle || !battle.reward) {
		return null;
	}

	const { experience, gold } = battle.reward;
	const { name } = battle.enemy;

	return (
		<Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs">
			<DialogTitle id="form-dialog-title">Victory!</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>
					You have defeated the {name}. You gain {experience} experience and {gold} gold.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCompleteBattle} color="primary" variant="contained" disabled={isLoading}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
