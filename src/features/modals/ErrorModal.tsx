import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeErrorModal } from "features/modals";

export const ErrorModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, title, message } = useAppSelector((state) => state.modals.errorModal);

	const handleClose = () => {
		dispatch(closeErrorModal());
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="error-dialog-title">
			<DialogTitle id="error-dialog-title" textAlign="center">
				{title || "Error"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center">{message || "Something went wrong!"}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose}>
					Confirm
				</Link>
			</DialogActions>
		</Dialog>
	);
};
