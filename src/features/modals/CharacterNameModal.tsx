import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
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
		<Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xs">
			<DialogTitle id="form-dialog-title">Name</DialogTitle>
			<DialogContent>
				<DialogContentText>Please give your character a name.</DialogContentText>
				<TextField
					inputRef={nameRef}
					variant="filled"
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
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleConfirm} disabled={isLoading}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};
