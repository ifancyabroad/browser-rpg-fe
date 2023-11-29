import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeCharacterClassModal } from "./modalsSlice";

export const CharacterClassModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open } = useAppSelector((state) => state.modals.characterClassModal);

	const handleClose = () => {
		dispatch(closeCharacterClassModal());
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Title</DialogTitle>
			<DialogContent>
				<DialogContentText>Description</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="contained">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};
