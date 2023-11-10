import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openLoginModal, openRegistrationModal } from "features/modals";

export const Landing: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleLogin = () => {
		dispatch(openLoginModal());
	};

	const handleRegister = () => {
		dispatch(openRegistrationModal());
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Typography variant="h5">BROWSER HEROES</Typography>
			<Typography>Click the button below to login!</Typography>
			<Box display="flex" justifyContent="center" gap={2}>
				<Button color="secondary" variant="contained" onClick={handleLogin}>
					LOGIN
				</Button>
				<Button variant="contained" onClick={handleRegister}>
					REGISTER
				</Button>
			</Box>
		</Box>
	);
};
