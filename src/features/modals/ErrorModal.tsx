import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeErrorModal } from "features/modals/modalsSlice";

export const ErrorModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, title, message } = useAppSelector((state) => state.modals.errorModal);

	const handleClose = () => {
		dispatch(closeErrorModal());
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{title || "Error"}</DialogTitle>
			<DialogContent>
				<DialogContentText>{message || "Something went wrong!"}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};
