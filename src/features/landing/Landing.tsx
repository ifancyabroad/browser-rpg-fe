import { alpha, Box, Container, Link, Paper, Stack, Typography } from "@mui/material";
import { Dragon, Footer, Header } from "common/components";
import { useAppDispatch } from "common/hooks";
import { openLoginModal, openRegistrationModal } from "features/modals";

export const Landing: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleRegister = () => {
		dispatch(openRegistrationModal());
	};

	const handleLogin = () => {
		dispatch(openLoginModal());
	};

	return (
		<Box
			sx={{
				minHeight: "100svh",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			<Header />

			<Box flex={1} display="flex" alignItems="center" justifyContent="center">
				<Container maxWidth="xs">
					<Paper
						sx={(theme) => ({
							position: "relative",
							p: 3,
							backgroundColor: alpha(theme.palette.background.paper, 0.9),
						})}
					>
						<Dragon />
						<Stack spacing={3}>
							<Typography variant="h1" textAlign="center">
								Browser Heroes
							</Typography>
							<Typography textAlign="center">
								Welcome to{" "}
								<Box component="span" color="text.secondary">
									Browser Heroes
								</Box>
								, a free to play role playing game that can be played in your browser.
							</Typography>
							<Box display="flex" justifyContent="center" gap={1}>
								<Link component="button" onClick={handleRegister}>
									Register
								</Link>
								<Typography color="text.secondary">or</Typography>
								<Link component="button" onClick={handleLogin}>
									Login
								</Link>
							</Box>
						</Stack>
					</Paper>
				</Container>
			</Box>

			<Footer />
		</Box>
	);
};
