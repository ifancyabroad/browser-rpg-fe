import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsLoading, registerGuest } from "features/authentication";
import { closeUsernameModal, openErrorModal } from "features/modals";
import { useRef } from "react";

export const UsernameModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.usernameModalOpen);
	const isLoading = useAppSelector(getIsLoading);
	const usernameRef = useRef<HTMLInputElement>(null);

	const handleClose = () => {
		dispatch(closeUsernameModal());
	};

	const handleRegister = async () => {
		try {
			await dispatch(
				registerGuest({
					username: usernameRef.current!.value,
				}),
			).unwrap();
			dispatch(closeUsernameModal());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="registration-dialog-title" maxWidth="xs">
			<DialogTitle id="registration-dialog-title">Username</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>Please enter a username.</DialogContentText>
				<TextField
					inputRef={usernameRef}
					autoFocus
					margin="dense"
					label="Username"
					type="text"
					fullWidth
					required
					inputProps={{ minLength: 2, maxLength: 20 }}
				/>
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleClose}>
					Close
				</Link>
				<Link component="button" onClick={handleRegister} disabled={isLoading}>
					Start
				</Link>
			</DialogActions>
		</Dialog>
	);
};
