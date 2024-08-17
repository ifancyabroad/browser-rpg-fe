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
		dispatch(closeVictoryModal());
		dispatch(openLeaderboard());
	};

	const handleContinue = async () => {
		dispatch(closeVictoryModal());
		navigate("/");
	};

	if (!character) {
		return null;
	}

	const { name } = character;

	return (
		<Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs">
			<DialogTitle id="form-dialog-title" textAlign="center">
				Victory!
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center" mb={2}>
					Congratulations{" "}
					<Box component="span" color="text.secondary">
						{name}
					</Box>
					, you have defeated the final boss and escaped the dungeon.
				</DialogContentText>
				<DialogContentText textAlign="center">
					Your deeds will be saved in the pantheon of heroes.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleViewLeaderboard}>
					View Leaderboard
				</Link>
				<Link component="button" onClick={handleContinue}>
					Back to Menu
				</Link>
			</DialogActions>
		</Dialog>
	);
};
