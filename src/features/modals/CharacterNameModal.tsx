import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { useRef } from "react";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (name: string) => void;
}

export const CharacterNameModal: React.FC<IProps> = ({ isOpen, onClose, onConfirm }) => {
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const nameRef = useRef<HTMLInputElement>(null);

	const handleClose = () => {
		onClose();
	};

	const handleConfirm = async () => {
		onConfirm(nameRef.current!.value);
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Name</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>Please give your character a name.</DialogContentText>
				<TextField
					inputRef={nameRef}
					autoFocus
					margin="dense"
					id="name"
					label="Name"
					type="text"
					fullWidth
					required
				/>
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleClose}>
					Cancel
				</Link>
				<Link component="button" onClick={handleConfirm} disabled={isLoading}>
					Confirm
				</Link>
			</DialogActions>
		</Dialog>
	);
};
