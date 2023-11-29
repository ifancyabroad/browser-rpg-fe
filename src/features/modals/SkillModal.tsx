import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeSkillModal } from "./modalsSlice";

export const SkillModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open } = useAppSelector((state) => state.modals.skillModal);

	const handleClose = () => {
		dispatch(closeSkillModal());
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
