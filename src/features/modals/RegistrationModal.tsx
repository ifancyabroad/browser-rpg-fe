import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsLoading, register } from "features/authentication";
import { closeRegistrationModal, openErrorModal, openLoginModal } from "features/modals";
import { useEffect, useRef } from "react";

export const RegistrationModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.authentication.session);
	const open = useAppSelector((state) => state.modals.registrationModalOpen);
	const isLoading = useAppSelector(getIsLoading);
	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(closeRegistrationModal());
		}
	}, [dispatch, isLoggedIn]);

	const handleClose = () => {
		dispatch(closeRegistrationModal());
	};

	const handleChangeModal = () => {
		dispatch(closeRegistrationModal());
		dispatch(openLoginModal());
	};

	const handleRegister = async () => {
		try {
			await dispatch(
				register({
					username: usernameRef.current!.value,
					email: emailRef.current!.value,
					password: passwordRef.current!.value,
				}),
			).unwrap();
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
					Please enter a username and password to register or click{" "}
					<Link component="button" sx={{ verticalAlign: "baseline" }} onClick={handleChangeModal}>
						here
					</Link>{" "}
					to sign in.
				</DialogContentText>
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
