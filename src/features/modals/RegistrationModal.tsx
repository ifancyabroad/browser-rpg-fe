import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsLoading, register } from "features/authentication";
import { closeRegistrationModal, openErrorModal, openLoginModal } from "features/modals";
import { useEffect, useRef, useState } from "react";

export const RegistrationModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.authentication.user);
	const open = useAppSelector((state) => state.modals.registrationModalOpen);
	const isLoading = useAppSelector(getIsLoading);
	const [username, setUsername] = useState(user?.username || "");
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (open && user) {
			setUsername(user?.username || "");
		} else {
			setUsername("");
		}
	}, [user, open]);

	const handleClose = () => {
		dispatch(closeRegistrationModal());
	};

	const handleChangeModal = () => {
		dispatch(closeRegistrationModal());
		dispatch(openLoginModal());
	};

	const handleUpdateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleRegister = async () => {
		try {
			await dispatch(
				register({
					username,
					email: emailRef.current!.value,
					password: passwordRef.current!.value,
				}),
			).unwrap();
			dispatch(closeRegistrationModal());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="registration-dialog-title" maxWidth="xs">
			<DialogTitle id="registration-dialog-title">Register</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>
					Please enter a username, email, and password. Already have an account?{" "}
					<Link component="button" onClick={handleChangeModal}>
						Login
					</Link>
				</DialogContentText>
				<TextField
					value={username}
					onChange={handleUpdateUsername}
					autoFocus
					margin="dense"
					label="Username"
					type="text"
					fullWidth
					required
					inputProps={{ minLength: 2, maxLength: 20 }}
				/>
				<TextField inputRef={emailRef} margin="dense" label="Email Address" type="email" fullWidth required />
				<TextField inputRef={passwordRef} margin="dense" label="Password" type="password" fullWidth required />
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleClose}>
					Cancel
				</Link>
				<Link component="button" onClick={handleRegister} disabled={isLoading}>
					Register
				</Link>
			</DialogActions>
		</Dialog>
	);
};
