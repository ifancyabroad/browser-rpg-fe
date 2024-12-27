import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeBattleModal, closeRewardsModal, closeVictoryModal, openErrorModal } from "./modalsSlice";
import { useNavigate } from "react-router-dom";
import { openLeaderboard } from "features/leaderboard";
import { retireCharacter } from "features/character";
import { Fragment, useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

export const VictoryModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.modals.victoryModalOpen);
	const character = useAppSelector((state) => state.character.character);
	const [openConfirmation, setOpenConfirmation] = useState(false);

	const handleViewLeaderboard = () => {
		dispatch(openLeaderboard());
	};

	const handleOpenConfirmation = () => {
		setOpenConfirmation(true);
	};

	const handleCloseConfirmation = () => {
		setOpenConfirmation(false);
	};

	const handleRetire = async () => {
		try {
			await dispatch(retireCharacter()).unwrap();
			dispatch(closeVictoryModal());
			dispatch(closeBattleModal());
			dispatch(closeRewardsModal());
			navigate("/");
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleContinue = async () => {
		dispatch(closeVictoryModal());
	};

	if (!character) {
		return null;
	}

	const { name } = character;

	return (
		<Fragment>
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
						Do you wish to retire your hero or would you like to continue your adventure in a bid to earn
						your place in the pantheon of heroes?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link component="button" color="info.light" onClick={handleViewLeaderboard}>
						View Leaderboard
					</Link>
					<Link component="button" color="text.secondary" onClick={handleOpenConfirmation}>
						Retire
					</Link>
					<Link component="button" onClick={handleContinue}>
						Continue
					</Link>
				</DialogActions>
			</Dialog>

			<ConfirmationModal
				open={openConfirmation}
				title="Are you sure?"
				content="Once you retire your hero, you will not be able to continue your adventure with them."
				handleConfirm={handleRetire}
				handleClose={handleCloseConfirmation}
			/>
		</Fragment>
	);
};
