import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeBattleModal, closeGameOverModal } from "./modalsSlice";
import { useNavigate } from "react-router-dom";
import { getDeterminer } from "common/utils";
import { openLeaderboard } from "features/leaderboard";

export const GameOverModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.modals.gameOverModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";

	const handleViewLeaderboard = () => {
		dispatch(openLeaderboard());
	};

	const handleGameOver = async () => {
		dispatch(closeBattleModal());
		dispatch(closeGameOverModal());
		navigate("/");
	};

	if (!battle) {
		return null;
	}

	const { name } = battle.enemy;
	const determiner = getDeterminer(name);

	return (
		<Dialog open={open} aria-labelledby="game-over-dialog-title" maxWidth="xs">
			<DialogTitle id="game-over-dialog-title" textAlign="center">
				You Died
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center">
					You have been slain by {determiner}{" "}
					<Box component="span" color="text.secondary">
						{name}
					</Box>
					.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleViewLeaderboard}>
					View Leaderboard
				</Link>
				<Link component="button" onClick={handleGameOver} disabled={isLoading}>
					Back to Menu
				</Link>
			</DialogActions>
		</Dialog>
	);
};
