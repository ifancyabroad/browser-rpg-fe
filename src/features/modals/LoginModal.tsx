import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsLoading, login } from "features/authentication";
import { closeLoginModal, openErrorModal, openRegistrationModal } from "features/modals";
import { useRef } from "react";

export const LoginModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.loginModalOpen);
	const isLoading = useAppSelector(getIsLoading);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

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
			dispatch(closeLoginModal());
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
					Please enter your email and password to login. Don't have an account?{" "}
					<Link component="button" onClick={handleChangeModal}>
						Register
					</Link>
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
