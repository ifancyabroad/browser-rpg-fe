import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
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
			<DialogTitle id="form-dialog-title" textAlign="center">
				You Died
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center">You have been slain by {name}.</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleGameOver} disabled={isLoading}>
					Try again
				</Link>
			</DialogActions>
		</Dialog>
	);
};
