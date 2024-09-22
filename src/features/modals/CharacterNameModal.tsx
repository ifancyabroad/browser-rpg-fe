import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { useState } from "react";
import { nameByRace } from "fantasy-name-generator";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (name: string) => void;
}

export const CharacterNameModal: React.FC<IProps> = ({ isOpen, onClose, onConfirm }) => {
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const generatedName = nameByRace("human");
	const [name, setName] = useState(typeof generatedName === "string" ? generatedName : "");

	const handleClose = () => {
		onClose();
	};

	const handleConfirm = async () => {
		onConfirm(name);
	};

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleGenerateName = () => {
		const generatedName = nameByRace("human");
		if (typeof generatedName === "string") {
			setName(generatedName);
		}
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Name</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>Please give your character a name.</DialogContentText>
				<TextField
					onChange={handleChangeName}
					value={name}
					autoFocus
					margin="dense"
					id="name"
					label="Name"
					type="text"
					fullWidth
					required
					inputProps={{
						minLength: 3,
						maxLength: 10,
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleGenerateName}>
					Generate Name
				</Link>
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
