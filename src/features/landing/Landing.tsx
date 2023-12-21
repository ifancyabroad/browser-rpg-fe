import { Box, Button, Link, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openLoginModal, openRegistrationModal } from "features/modals";
import logo from "assets/images/logos/browser_heroes.png";

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
				minHeight: "calc(100vh - 53px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 2,
				p: 2,
			}}
		>
			<Paper
				sx={{
					maxWidth: "600px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					textAlign: "center",
					gap: 2,
					p: 4,
				}}
			>
				<Box component="img" src={logo} height={64} width={64} />
				<Typography variant="h5" fontFamily="'Cinzel', serif" fontWeight="bold">
					BROWSER HEROES
				</Typography>
				<Typography variant="subtitle1">Welcome to Browser Heroes! </Typography>
				<Typography>
					Browser Heroes is a free to play role playing game that can be played in your browser. Choose from a
					selection of different classes and make your way through a procedurally generated dungeon battling
					all variery of different monsters and enemies.
				</Typography>
				<Typography>Click one of the buttons below to login or register!</Typography>
				<Box display="flex" justifyContent="center" gap={2}>
					<Button color="secondary" variant="contained" onClick={handleLogin}>
						LOGIN
					</Button>
					<Button variant="contained" onClick={handleRegister}>
						REGISTER
					</Button>
				</Box>
				<Typography variant="body2">
					For any questions or comments please email me at{" "}
					<Link href="mailto:edgar.nightingale@btinternet.com">edgar.nightingale@btinternet.com</Link>
				</Typography>
			</Paper>
		</Box>
	);
};
