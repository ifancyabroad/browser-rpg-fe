import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeVictoryModal } from "./modalsSlice";
import { useNavigate } from "react-router-dom";
import { openLeaderboard } from "features/leaderboard";

export const VictoryModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.modals.victoryModalOpen);
	const character = useAppSelector((state) => state.character.character);

	const handleViewLeaderboard = () => {
		dispatch(openLeaderboard());
	};

	const handleExit = () => {
		// TODO: retire character and change status to complete
		dispatch(closeVictoryModal());
		navigate("/");
	};

	const handleContinue = async () => {
		dispatch(closeVictoryModal());
	};

	if (!character) {
		return null;
	}

	const { name } = character;

	return (
		<Dialog open={open} aria-labelledby="victory-dialog-title" maxWidth="xs">
			<DialogTitle id="victory-dialog-title" textAlign="center">
				Congratulations!
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center" mb={2}>
					With the foul creatures slain, the town is saved and{" "}
					<Box component="span" color="text.secondary">
						{name}
					</Box>{" "}
					is hailed as a hero.
				</DialogContentText>
				<DialogContentText textAlign="center">
					Do you wish to retire your hero or would you like to continue your adventure in a bid to earn your
					place in the pantheon of heroes?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" color="info.light" onClick={handleViewLeaderboard}>
					View Leaderboard
				</Link>
				<Link component="button" color="text.secondary" onClick={handleExit}>
					Retire
				</Link>
				<Link component="button" onClick={handleContinue}>
					Continue
				</Link>
			</DialogActions>
		</Dialog>
	);
};
