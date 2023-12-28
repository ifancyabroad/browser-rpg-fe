import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeGameOverModal } from "./modalsSlice";
import { useNavigate } from "react-router-dom";

export const GameOverModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.modals.gameOverModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";

	const handleGameOver = async () => {
		dispatch(closeGameOverModal());
		navigate("/");
	};

	if (!battle) {
		return null;
	}

	const { name } = battle.enemy;

	return (
		<Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs">
			<DialogTitle id="form-dialog-title">You Died</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>You have been slain by {name}.</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleGameOver} color="primary" variant="contained" disabled={isLoading}>
					Try again
				</Button>
			</DialogActions>
		</Dialog>
	);
};
