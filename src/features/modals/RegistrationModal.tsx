import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsLoading, register } from "features/authentication";
import { closeRegistrationModal, openLoginModal } from "features/modals";
import { useEffect, useRef } from "react";

export const RegistrationModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.authentication.session);
	const open = useAppSelector((state) => state.modals.registrationModalOpen);
	const isLoading = useAppSelector(getIsLoading);
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
		dispatch(
			register({
				email: emailRef.current!.value,
				password: passwordRef.current!.value,
			}),
		);
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Register</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please enter your email and password to register or click{" "}
					<Link component="button" sx={{ verticalAlign: "baseline" }} onClick={handleChangeModal}>
						here
					</Link>{" "}
					to sign in.
				</DialogContentText>
				<TextField
					inputRef={emailRef}
					autoFocus
					margin="dense"
					id="name"
					label="Email Address"
					type="email"
					fullWidth
					required
				/>
				<TextField
					inputRef={passwordRef}
					margin="dense"
					id="standard-basic"
					label="Password"
					type="password"
					fullWidth
					required
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleRegister} color="primary" disabled={isLoading}>
					Register
				</Button>
			</DialogActions>
		</Dialog>
	);
};
