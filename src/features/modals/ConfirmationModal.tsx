import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface IProps {
	open: boolean;
	title: string;
	content: string;
	handleClose: () => void;
	handleConfirm: () => void;
	disabled?: boolean;
}

export const ConfirmationModal: React.FC<IProps> = ({ open, title, content, handleClose, handleConfirm, disabled }) => (
	<Dialog open={open} onClose={handleClose} maxWidth="xs" aria-labelledby="form-dialog-title">
		<DialogTitle id="form-dialog-title" textAlign="center">
			{title}
		</DialogTitle>
		<DialogContent>
			<DialogContentText textAlign="center">{content}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>Cancel</Button>
			<Button onClick={handleConfirm} disabled={disabled}>
				Confirm
			</Button>
		</DialogActions>
	</Dialog>
);
