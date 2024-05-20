import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";

interface IProps {
	open: boolean;
	title: string;
	content: string;
	handleClose: () => void;
	handleConfirm: () => void;
	disabled?: boolean;
}

export const ConfirmationModal: React.FC<IProps> = ({ open, title, content, handleClose, handleConfirm, disabled }) => (
	<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
		<DialogTitle id="form-dialog-title" textAlign="center">
			{title}
		</DialogTitle>
		<DialogContent>
			<DialogContentText textAlign="center">{content}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Link component="button" color="text.secondary" onClick={handleClose}>
				Cancel
			</Link>
			<Link component="button" onClick={handleConfirm} disabled={disabled}>
				Confirm
			</Link>
		</DialogActions>
	</Dialog>
);
