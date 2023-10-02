import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { completeBattle } from "features/game";
import { closeBattleCompleteModal } from "./modalsSlice";
import { useNavigate } from "react-router-dom";

export const BattleCompleteModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.modals.battleCompleteModalOpen);
	const battle = useAppSelector((state) => state.game.battle);
	const status = useAppSelector((state) => state.game.status);
	const isLoading = status === "loading";

	const handleCompleteBattle = async () => {
		await dispatch(completeBattle());
		dispatch(closeBattleCompleteModal());
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
				<Button onClick={handleCompleteBattle} color="primary" disabled={isLoading}>
					Return to town
				</Button>
			</DialogActions>
		</Dialog>
	);
};
