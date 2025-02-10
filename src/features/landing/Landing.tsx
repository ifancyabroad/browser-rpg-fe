import { alpha, Box, Container, Link, Paper, Stack, styled, Typography } from "@mui/material";
import { Dragon, Footer, Header } from "common/components";
import { useAppDispatch } from "common/hooks";
import { openLoginModal, openUsernameModal } from "features/modals";
import logo from "assets/images/logos/browser_heroes.png";

const Logo = styled("img")({
	width: "100%",
	maxWidth: 260,
	marginRight: -20,
});

export const Landing: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleStart = () => {
		dispatch(openUsernameModal());
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
						<Stack spacing={3} alignItems="center">
							<Logo src={logo} alt="Browser Heroes" width="200" />
							<Typography textAlign="center">
								Welcome to{" "}
								<Box component="span" color="text.secondary">
									Browser Heroes
								</Box>
								, a free to play role playing game that can be played in your browser.
							</Typography>
							<Box display="flex" justifyContent="center" gap={1}>
								<Link component="button" onClick={handleStart}>
									PLAY NOW
								</Link>
							</Box>
							<Typography textAlign="center">
								Already have an account?{" "}
								<Link component="button" onClick={handleLogin}>
									Login
								</Link>
							</Typography>
						</Stack>
					</Paper>
				</Container>
			</Box>

			<Footer />
		</Box>
	);
};
