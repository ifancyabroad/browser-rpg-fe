import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeFinalBattleModal, closeRewardsModal, openErrorModal } from "./modalsSlice";
import { nextBattle, startBattle } from "features/battle";
import { State } from "common/utils";

export const FinalBattleModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.finalBattleModalOpen);
	const character = useAppSelector((state) => state.character.character);

	const handleExit = () => {
		dispatch(closeFinalBattleModal());
	};

	const handleContinue = async () => {
		if (!character) {
			return;
		}

		try {
			if (character.state === State.Battle) {
				dispatch(closeRewardsModal());
				dispatch(closeFinalBattleModal());
				await dispatch(nextBattle()).unwrap();
			} else {
				await dispatch(startBattle()).unwrap();
				dispatch(closeFinalBattleModal());
			}
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	if (!character) {
		return null;
	}

	return (
		<Dialog open={open} aria-labelledby="final-battle-dialog-title" maxWidth="xs">
			<DialogTitle id="final-battle-dialog-title" textAlign="center">
				Are you ready?
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center" mb={2}>
					You sense your journey is coming to an end.
				</DialogContentText>
				<DialogContentText textAlign="center" mb={2}>
					Having slain countless foes there is now only one challenge left to ensure the safety of the
					townsfolk.
				</DialogContentText>
				<DialogContentText textAlign="center">Are you ready to face the final battle?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleExit}>
					Not yet
				</Link>
				<Link component="button" onClick={handleContinue}>
					Yes, let's go!
				</Link>
			</DialogActions>
		</Dialog>
	);
};
