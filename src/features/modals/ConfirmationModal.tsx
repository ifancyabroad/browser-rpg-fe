import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { GameButton } from "common/components";

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
		<DialogTitle id="form-dialog-title">{title}</DialogTitle>
		<DialogContent>
			<DialogContentText>{content}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<GameButton onClick={handleClose}>Cancel</GameButton>
			<GameButton onClick={handleConfirm} disabled={disabled}>
				Confirm
			</GameButton>
		</DialogActions>
	</Dialog>
);
