import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeBattleModal, closeGameOverModal, openRegistrationModal } from "./modalsSlice";
import { useNavigate } from "react-router-dom";
import { getDeterminer } from "common/utils";
import { openLeaderboard } from "features/leaderboard";
import { getIsRegistered } from "features/authentication";

export const GameOverModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.modals.gameOverModalOpen);
	const isRegistered = useAppSelector(getIsRegistered);
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.battle.battle);
	const enemy = useAppSelector((state) => state.battle.enemy);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";

	const handleViewLeaderboard = () => {
		dispatch(openLeaderboard());
	};

	const handleRegister = () => {
		dispatch(openRegistrationModal());
	};

	const handleGameOver = async () => {
		dispatch(closeBattleModal());
		dispatch(closeGameOverModal());
		navigate("/");
	};

	const handlePlayAgain = async () => {
		dispatch(closeBattleModal());
		dispatch(closeGameOverModal());
		navigate("/create");
	};

	const handleClose = () => {
		dispatch(closeGameOverModal());
	};

	if (!battle || !character || !enemy) {
		return null;
	}

	const { name } = enemy;
	const determiner = getDeterminer(name);

	return (
		<Dialog open={open} aria-labelledby="game-over-dialog-title" maxWidth="xs">
			<DialogTitle id="game-over-dialog-title" textAlign="center">
				You Died
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center" mb={2}>
					You have been slain by {determiner}{" "}
					<Box component="span" color="text.secondary">
						{name}
					</Box>
					.
				</DialogContentText>
				<DialogContentText textAlign="center" mb={2}>
					Your items will be salvaged for{" "}
					<Box component="span" color="text.secondary">
						{character.salvageValue} gold
					</Box>{" "}
					made available for your next hero to spend.
				</DialogContentText>
				{isRegistered ? (
					<DialogContentText textAlign="center">
						<Link component="button" onClick={handleViewLeaderboard} disabled={isLoading}>
							Click here
						</Link>{" "}
						to take a look at the leaderboard or click below to play again.
					</DialogContentText>
				) : (
					<DialogContentText textAlign="center">
						<Link component="button" onClick={handleRegister} disabled={isLoading}>
							Click here
						</Link>{" "}
						to register an account and save your progress or click below to play again.
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Link component="button" color="info.light" onClick={handlePlayAgain} disabled={isLoading}>
					Play Again
				</Link>
				<Link component="button" onClick={handleGameOver} disabled={isLoading}>
					Back to Menu
				</Link>
				<Link component="button" color="text.secondary" onClick={handleClose} disabled={isLoading}>
					What happened?
				</Link>
			</DialogActions>
		</Dialog>
	);
};
