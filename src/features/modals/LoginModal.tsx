import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsLoading, login } from "features/authentication";
import { closeLoginModal, openErrorModal, openRegistrationModal } from "features/modals";
import { useEffect, useRef } from "react";

export const LoginModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.authentication.session);
	const open = useAppSelector((state) => state.modals.loginModalOpen);
	const isLoading = useAppSelector(getIsLoading);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(closeLoginModal());
		}
	}, [dispatch, isLoggedIn]);

	const handleClose = () => {
		dispatch(closeLoginModal());
	};

	const handleChangeModal = () => {
		dispatch(closeLoginModal());
		dispatch(openRegistrationModal());
	};

	const handleLogin = async () => {
		try {
			await dispatch(
				login({
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
		<Dialog open={open} onClose={handleClose} aria-labelledby="login-dialog-title">
			<DialogTitle id="login-dialog-title">Login</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>
					Please enter your email and password to login or click{" "}
					<Link component="button" sx={{ verticalAlign: "baseline" }} onClick={handleChangeModal}>
						here
					</Link>{" "}
					to sign up.
				</DialogContentText>
				<TextField
					inputRef={emailRef}
					autoFocus
					margin="dense"
					label="Email Address"
					type="email"
					fullWidth
					required
				/>
				<TextField inputRef={passwordRef} margin="dense" label="Password" type="password" fullWidth required />
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleClose}>
					Cancel
				</Link>
				<Link component="button" onClick={handleLogin} disabled={isLoading}>
					Login
				</Link>
			</DialogActions>
		</Dialog>
	);
};
